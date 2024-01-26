import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;
// export type UserDocument = User & Document;

@Schema({timestamps: true})
export class User {
  @Prop()
  firstname: string;

  @Prop()
  lastname: string;

  
  @Prop({unique: true})
  email: string;

  @Prop()
  hashedPassword: string;

  @Prop()
  tag: string[];

  @Prop()
  education: string[];

}

const UserSchema = SchemaFactory.createForClass(User);

export { UserSchema };
