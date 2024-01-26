// import { Prop, Schema, SchemaFactory,} from '@nestjs/mongoose';
// import { HydratedDocument } from 'mongoose';
// import  immutablePlugin  from 'src/util/immutable.plugin';

// export type BlogDocument = HydratedDocument<Blog>;

// @Schema({ timestamps: true })
// export class Blog {
//   @Prop({ required: true, unique: true })
//   title: string;

//   @Prop({ required: true })
//   description: string;

//   @Prop()
//   tag: string[];

//   @Prop()
//   body: string;

//   @Prop({ default: 0 })
//   views: number;

//   @Prop({ default: 0 })
//   ratings: number;

//   // @Prop({type: String, ref: 'User', required: true})
//   // author: string

//   @Prop()
//   readingTime: number;

//   @Prop({
//     default: 'draft',
//     validate: {
//       validator: (value: 'draft' | 'published') => ['draft', 'published'].includes(value),
//       message: 'Invalid state value. Should be either "draft" or "published".',
//     },
//   })
//   state: string;
// }

// const BlogSchema = SchemaFactory.createForClass(Blog);
// BlogSchema.plugin(immutablePlugin);

// export {BlogSchema}


import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type BlogDocument = HydratedDocument<Blog>;

// Helper function to calculate reading time
function calculateReadingTime(body: string): number {
  const wordsPerMinute = 200;
  const wordCount = body.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

// Immutable Plugin
function immutablePlugin(schema: MongooseSchema) {
  schema.eachPath((path) => {
    if (path !== '_id' && path !== '__v' && path !== 'createdAt' && path !== 'updatedAt') {
      schema.path(path).immutable(true);
    }
  });
}

@Schema({ timestamps: true })
export class Blog {
  @Prop({ required: true, unique: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop()
  tag: string[];

  @Prop()
  body: string;

  @Prop({ default: 0 })
  views: number;

  @Prop({ default: 0 })
  ratings: number;

  @Prop()
  readingTime: number;

  @Prop({
    default: 'draft',
    validate: {
      validator: (value: 'draft' | 'published') => ['draft', 'published'].includes(value),
      message: 'Invalid state value. Should be either "draft" or "published".',
    },
  })
  state: string;
}

const BlogSchema = SchemaFactory.createForClass(Blog);

// Add createdAt and updatedAt fields
BlogSchema.set('timestamps', true);

// Set default state to draft and add the immutablePlugin
BlogSchema.plugin(immutablePlugin);

// Add a pre-save hook to set default values for views, ratings, and readingTime
BlogSchema.pre('save', function (next) {
  if (this.isNew) {
    this.views = 0;
    this.ratings = 0;
    this.readingTime = calculateReadingTime(this.body);
  }
  next();
});

export { BlogSchema };

