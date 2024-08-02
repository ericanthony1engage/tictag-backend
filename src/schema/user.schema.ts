import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { USER_ROLES } from '../enum/role';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, enum: USER_ROLES })
  role: USER_ROLES;
}

export const UserSchema = SchemaFactory.createForClass(User);
