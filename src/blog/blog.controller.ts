import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { BlogService } from './blog.service';
import { createUserDto } from 'src/user/dto';
import { CreateBlog } from './dto/create-blog.dto';

@Controller('blog')
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async createBlog(@Body() dto: CreateBlog) {
    return this.blogService.createBlog(dto)
  }


  @Get('blogs')
  @HttpCode(HttpStatus.OK)
  async getAllBlogs() {
    return this.blogService.getAllBlogs()
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getBlog(@Param('id') blogId: string) {
    return this.blogService.getBlog(blogId)
  }
}
