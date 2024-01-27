import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Delete,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlog } from './dto/create-blog.dto';
import { EditBlogDto } from './dto/edit-blog.dto';

@Controller('blog')
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async createBlog(@Body() dto: CreateBlog) {
    return this.blogService.createBlog(dto);
  }

  @Get('blogs')
  @HttpCode(HttpStatus.OK)
  async getAllBlogs() {
    return this.blogService.getAllBlogs();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getBlog(@Param('id') blogId: string) {
    return this.blogService.getBlog(blogId);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async updateBlog(@Param('id') blogId: string, @Body() update: EditBlogDto) {
    return this.blogService.updateBlog(blogId, update);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteBlog(@Param('id') blogId: string) {
    return this.blogService.deleteBlog(blogId);
  }
}
