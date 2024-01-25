import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { createUserDto } from './dto/create-User.dto';
import { signin } from './dto/siginin.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/guards/jwt-guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}


  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() userDto: createUserDto) {
    return this.userService.signup(userDto);
  }


  // @UseGuards(LocalAuthGuard)
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signin(@Body() signinDto: signin) {
    return this.userService.signin(signinDto)
  }

  @UseGuards(JwtAuthGuard)
  @Get('allUser')
  @HttpCode(HttpStatus.OK)
  async getUsers() {
    return this.userService.getUsers()
  }
}
