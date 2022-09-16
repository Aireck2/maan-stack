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
  @Field(() => ID)
  _id: Schema.Types.ObjectId;

  @Field(() => Category)
  category: Category;
  @Field(() => Brand)
  brand: Brand;

  @Field(() => String)
  status: string;

  @Field(() => String)
  name: string;
  @Field(() => String)
  slug: string;

  @Field(() => Boolean, { nullable: true })
  isVisible?: boolean;
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
