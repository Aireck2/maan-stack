import { Field, ID, InputType } from '@nestjs/graphql';
import { Schema } from 'mongoose';
@InputType()
export class InputCategory {
  @Field()
  name: string;
  @Field()
  slug: string;
}

@InputType()
export class InputBrand {
  @Field()
  name: string;
  @Field()
  slug: string;
}
@InputType()
export class InputAddProduct {
  @Field()
  name: string;
  @Field()
  category: InputCategory;
  @Field()
  brand: InputBrand;
  @Field()
  slug: string;
  @Field()
  status: string;
}

@InputType()
export class InputUpdProduct {
  @Field()
  _id: string;
  @Field({ nullable: true })
  name: string;
  @Field({ nullable: true })
  category: InputCategory;
  @Field({ nullable: true })
  brand: InputBrand;
  @Field({ nullable: true })
  slug: string;
  @Field({ nullable: true })
  status: string;
  @Field({ nullable: true })
  isVisible: boolean;
}
@InputType()
export class InputGetProduct {
  @Field()
  _id: string;
}
