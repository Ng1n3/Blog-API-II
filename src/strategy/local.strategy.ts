import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt } from "passport-jwt";
import { Strategy } from "passport-local";
import { signin } from "src/user/dto";
import { UserService } from "src/user/user.service";


type JwtPayload = {
  email: string,
  password: string;
}

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET
    });
  }

  // async validate(dto: signin): Promise<any> {
  //   const user = await this. userService.signin(dto)
  //   if(!user) throw new UnauthorizedException();
  //   return user;
  // }

  async validate(payload: JwtPayload) {
    return payload;
  }
}