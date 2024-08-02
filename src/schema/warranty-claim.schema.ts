import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.schema';
import { Product } from './product.schema';

export type WarrantyClaimDocument = WarrantyClaim & Document;

@Schema({ timestamps: true })
export class WarrantyClaim {
  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  product: Product;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  customer: User;

  @Prop({ required: true })
  description: string;

  @Prop({
    required: true,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  })
  status: string;
}

export const WarrantyClaimSchema = SchemaFactory.createForClass(WarrantyClaim);
