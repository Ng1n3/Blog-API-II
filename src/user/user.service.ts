// user.service.ts
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { createUserDto } from './dto/create-user.dto';
import { User } from '../schema/user.schema';
import { signin } from './dto/siginin.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signup(dto: createUserDto) {
    const findUser = await this.userModel.findOne({ email: dto.email });
    if (findUser) throw new ConflictException('Email already exists');
    const hashedPassword: string = await this.hashPassword(dto.password);
    const { password, ...rest } = dto;

    const newUser = new this.userModel({
      ...rest,
      hashedPassword,
    });

    await newUser.save();
    const tokens = await this.getToken(newUser._id.toString(), newUser.email)
    return {access_tokens: tokens};
  }

  async signin(signinDto: signin) {
    const user = await this.userModel.findOne({ email: signinDto.email });
    console.log(user);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await this.comparePasswords(
      signinDto.password,
      user.hashedPassword,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const tokens = await this.getToken(user._id.toString(), user.email)
    return {access_tokens: tokens}
  }

  async getUsers() {
    const users = await this.userModel.find()
    return users;
  }

  async findUserByUsername(username: string): Promise<User | null> {
    return this.userModel.findOne({ username });
  }

  async hashPassword(data: string) {
    return bcrypt.hash(data, 10);
  }

  async comparePasswords(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  private async stripPassword(user: User): Promise<User> {
    const userObject = (user as any).toObject();
    const { hashedPassword, ...rest } = userObject;
    return rest as User;
  }

  async getToken(userId: string, email: string) {
   return this.jwtService.sign({
    sub: userId,
    email,
   }, {
    secret: process.env.JWT_SECRET,
    expiresIn: 60 * 15
   })
  }

  async updateAtToken(userId: string, rt: string) {
    const hash = await this.hashPassword(rt);
    await this.userModel.updateOne()
  }
}
