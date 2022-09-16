import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema()
class Category {
  _id?: mongoose.ObjectId;
  @Prop()
  name: string;
  @Prop()
  slug: string;
}

@Schema()
class Brand {
  _id?: mongoose.ObjectId;
  @Prop()
  name: string;
  @Prop()
  slug: string;
}

@Schema()
export class Product {
  _id: mongoose.ObjectId;

  @Prop({ type: Category, ref: 'Category' })
  category: Category;

  @Prop({ type: Brand, ref: 'Brand' })
  brand: Brand;

  @Prop()
  status: string;

  @Prop()
  name: string;
  @Prop()
  slug: string;

  @Prop()
  isVisible: boolean;
}

export type ProductDocument = Product & mongoose.Document;

export const ProductSchema = SchemaFactory.createForClass(Product);
