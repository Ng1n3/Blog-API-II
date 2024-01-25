import { IsAlpha, IsArray, IsNotEmpty, IsString, IsEmail, IsOptional, MinLength } from "class-validator"

export class createUserDto {
  @IsNotEmpty()
  @IsAlpha()
  @MinLength(3, {message: 'Firstame is too short, minimum of 3 characters'})
  firstname: string

  @IsNotEmpty()
  @IsAlpha()
  @MinLength(3, {message: 'lastname is too short, minimum of 3 characters'})
  lastname: string

  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsString()
  @MinLength(5, {message: 'password too short, minimum of 5 characters'})
  password: string

  @IsOptional()
  @IsArray()
  @IsString()
  tag: string[]

  @IsOptional()
  @IsArray()
  @IsString()
  education: string[]

  // @IsOptional()
  // @IsString()
  // hashedRt: string
  
}