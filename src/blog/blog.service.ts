import {
  Injectable,
  Body,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { CreateBlog } from './dto/create-blog.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Blog } from 'src/schema';
import { Model } from 'mongoose';
import { EditBlogDto } from './dto/edit-blog.dto';

@Injectable()
export class BlogService {
  constructor(@InjectModel(Blog.name) private blogModel: Model<Blog>) {}

  async createBlog(@Body() dto: CreateBlog): Promise<Blog> {
    const existingBlog = await this.blogModel.findOne({ title: dto.title });
    if (existingBlog)
      throw new ConflictException('Blog with this title already exists');
    const newBlog = new this.blogModel(dto);

    newBlog.readingTime = this.calculateReadingTime(newBlog.body);
    await newBlog.save();
    return newBlog;
  }

  async getAllBlogs(): Promise<Blog[]> {
    const blogs = await this.blogModel.find();
    if (blogs.length < 1)
      new NotFoundException(
        'There are currently no blogs, kindly check back later',
      );

    return blogs;
  }

  async getBlog(blogId: string): Promise<Blog> {
    const blog = await this.blogModel.findById(blogId);
    if (!blog) throw new NotFoundException('blog not found!');
    return blog;
  }

  async updateBlog(blogId: string, body: EditBlogDto): Promise<Blog> {
    const blog = await this.blogModel.findById(blogId);
    if (!blog) throw new NotFoundException(`blog with id ${blogId} not found`);
    const blogUpdate = await this.blogModel.findByIdAndUpdate(
      blogId,
      { $set: body },
      { new: true },
    );

    return blogUpdate;
  }

  async deleteBlog(blogId: string) {
    const deltedBlog = await this.blogModel.findByIdAndDelete(blogId)
    if(!deltedBlog) throw new NotFoundException(`blog with id ${blogId} not found`)
  }

  calculateReadingTime(body: string): number {
    // Assuming an average reading speed of 200 words per minute
    const wordsPerMinute = 200;

    // Count the number of words in the body
    const wordCount = body.split(/\s+/).length;

    // Calculate the reading time in minutes
    const readingTime = Math.ceil(wordCount / wordsPerMinute);

    return readingTime;
  }
}
