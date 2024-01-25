import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { createUserDto } from './dto/create-User.dto';
import { signin } from './dto/siginin.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() userDto: createUserDto) {
    return this.userService.signup(userDto);
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signin(@Body() signinDto: signin) {
    return this.userService.signin(signinDto)
  }
}
