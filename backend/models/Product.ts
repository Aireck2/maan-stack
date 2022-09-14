import mongoose, { Document, Schema } from "mongoose";

export interface IProduct {
  name: string;
  category: ICategory;
  brand: IBrand;
  slug: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ICategory {
  name: string;
  slug: string;
}

interface IBrand {
  name: string;
  slug: string;
}

const Status = ["active", "inactive"];

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
    name: { type: String, required: true },
    category: CategorySchema,
    brand: BrandSchema,
    slug: { type: String, required: true },
    status: {
      type: String,
      default: "active",
      enum: Status,
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

export default mongoose.model<IProductModel>("Product", ProductSchema);
