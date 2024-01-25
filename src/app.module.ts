import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards';
import { BlogModule } from './blog/blog.module';

@Module({
  imports: [UserModule, MongooseModule.forRoot('mongodb://127.0.0.1:27017/blog-API-II'), ConfigModule.forRoot(), BlogModule],
  providers: [{
    provide: APP_GUARD,
    useClass: JwtAuthGuard
  }]
})
export class AppModule {}
