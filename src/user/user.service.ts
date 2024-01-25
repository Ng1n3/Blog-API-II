// user.service.ts
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as bcrypt from 'bcrypt';
import { createUserDto } from "./dto/create-user.dto";
import { User } from "../schema/user.schema";
import { signin } from "./dto/siginin.dto";

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async signup(dto: createUserDto) {
    const hashedPassword: string = await this.hashPassword(dto.password);
    const { password, ...rest } = dto;

    const newUser = new this.userModel({
      ...rest,
      hashedPassword,
    });

    const savedUser = await newUser.save();
    const returnedUser = await this.stripPassword(savedUser)
    return returnedUser;
  }

  async signin(signinDto: signin) {

    const user = await this.userModel.findOne({ email: signinDto.email })
    console.log(user)

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await this.comparePasswords(signinDto.password, user.hashedPassword);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    const saveduser = await this.stripPassword(user)
    return saveduser;
  }

  async findUserByUsername(username: string): Promise<User | null> {
    return this.userModel.findOne({ username })
  }

  async hashPassword(data: string) {
    return bcrypt.hash(data, 10);
  }

  async comparePasswords(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }



  private async stripPassword(user: User): Promise<User> {
    const userObject = (user as any).toObject();
    const { hashedPassword, ...rest } = userObject;
    return rest as User;
  }
  
}
