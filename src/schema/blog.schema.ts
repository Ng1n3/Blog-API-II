import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BlogDocument = HydratedDocument<Blog>;

// Helper function to calculate reading time
function calculateReadingTime(body: string): number {
  const wordsPerMinute = 200;
  const wordCount = body.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
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

  @Prop({ default: 0, immutable: true })
  views: number;

  @Prop({ default: 0, immutable: true })
  ratings: number;

  @Prop({ immutable: true })
  readingTime: number;

  // @Prop({
  //   default: 'draft',
  //   validate: {
  //     validator: (value: 'draft' | 'published') => ['draft', 'published'].includes(value),
  //     message: 'Invalid state value. Should be either "draft" or "published".',
  //   },
  // })
  // state: string;

  @Prop({
    enum: {
      values: ['draf', 'published'],
      message: `{VALUE} is not supported`,
    },
  })
  state: string;
}

const BlogSchema = SchemaFactory.createForClass(Blog);

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
