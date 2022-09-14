import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct {
  name: string;
  category: ICategory;
  brand: IBrand;
  slug: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICategory {
  name: string;
  slug: string;
}

export interface IBrand {
  name: string;
  slug: string;
}

const Status = ['active', 'most-sold', 'least-sold', 'expiring', 'expired'];

export interface IProductModel extends IProduct, Document {}

const CategorySchema: Schema = new Schema({
  name: { type: String },
  slug: { type: String },
});
const BrandSchema: Schema = new Schema({
  name: { type: String },
  slug: { type: String },
});

const ProductSchema: Schema = new Schema(
  {
    name: { type: String },
    category: CategorySchema,
    brand: BrandSchema,
    slug: { type: String },
    status: {
      type: String,
      default: 'active',
      enum: Status,
    },
    isVisible: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
      set: () => Date.now(),
    },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model<IProductModel>('Product', ProductSchema);
