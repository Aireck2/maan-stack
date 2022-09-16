import { Field, InputType } from '@nestjs/graphql';
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
