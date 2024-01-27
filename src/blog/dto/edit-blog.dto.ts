import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class EditBlogDto {
  @IsOptional()
  @IsString()
  @MinLength(5, { message: 'Title should have 5 characters minimum' })
  title: string;

  @IsOptional()
  @IsString()
  @MinLength(5, { message: 'Description should have 5 characters minimum' })
  description: string;

  @IsOptional()
  @IsArray()
  tag: string[];

  @IsOptional()
  @IsString()
  @MinLength(15, { message: 'Body should have 15 characters minimum' })
  body: string;

  @IsOptional()
  @IsNumber()
  views: number;

  @IsOptional()
  @IsNumber()
  ratings: number;

  // @IsString()
  // @IsOptional()
  // author: string

  @IsOptional()
  @IsNumber()
  readingTime: number;

  @IsOptional()
  state: string;
}
