import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Schema } from 'mongoose';

@ObjectType()
export class Category {
  @Field(() => String)
  name: string;
  @Field(() => String)
  slug: string;
}

@ObjectType()
export class Brand {
  @Field(() => String)
  name: string;
  @Field(() => String)
  slug: string;
}

@ObjectType()
export class Product {
  @Field(() => ID, { nullable: true })
  _id: Schema.Types.ObjectId;

  @Field(() => Category, { nullable: true })
  category: Category;
  @Field(() => Brand, { nullable: true })
  brand: Brand;

  @Field(() => String, { nullable: true })
  status: string;

  @Field(() => String, { nullable: true })
  name: string;
  @Field(() => String, { nullable: true })
  slug: string;

  @Field(() => Boolean, { nullable: true })
  isVisible?: boolean;

  @Field(() => Date, { nullable: true })
  createdAt?: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;
}

@ObjectType()
class PageInfo {
  @Field(() => Int)
  total: number;
  @Field(() => Int)
  page: number;
  @Field(() => Int)
  perPage: number;
  @Field(() => Boolean)
  hasPreviousPage: boolean;
  @Field(() => Boolean)
  hasNextPage: boolean;
}

@ObjectType()
export class PaginatedProduct {
  @Field(() => PageInfo)
  pageInfo: PageInfo;

  @Field(() => [Product])
  products: Product[];
}
