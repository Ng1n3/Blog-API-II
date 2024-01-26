import { IsArray, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from "class-validator"

export class CreateBlog {
  @IsNotEmpty()
  @IsString()
  @MinLength(5, {message: 'Title should have 5 characters minimum'})
  title: string
  
  @IsNotEmpty()
  @IsString()
  @MinLength(5, {message: 'Description should have 5 characters minimum'})
  description: string
  
  @IsNotEmpty()
  @IsArray()
  tag: string[]

  @IsNotEmpty()
  @IsString()
  @MinLength(15, {message: 'Body should have 15 characters minimum'})
  body: string
  
  @IsOptional()
  @IsNumber()
  views: number
  
  @IsOptional()
  @IsNumber()
  ratings: number
  
  // @IsString()
  // @IsNotEmpty()
  // author: string
  
  @IsOptional()
  @IsNumber()
  readingTime: number

  // @IsIn(['draft', 'published'], {message: 'Invalid state value'})
  state: string
}