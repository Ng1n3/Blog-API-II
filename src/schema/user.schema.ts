import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;
// export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  firstname: string;

  @Prop()
  lastname: string;

  @Prop()
  email: string;

  @Prop()
  hashedPassword: string;

  @Prop()
  tag: string[];

  @Prop()
  education: string[];
}

const UserSchema = SchemaFactory.createForClass(User);

// Define the toObject method explicitly
// UserSchema.method('toObject', function () {
//   const { hashedPassword, ...rest } = this.toObject();
//   return rest;
// });

export { UserSchema };
