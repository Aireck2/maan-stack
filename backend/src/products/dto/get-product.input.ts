import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class Paginated {
  @Field()
  page: number;
  @Field({ nullable: true })
  perPage?: number;
  @Field({ nullable: true })
  sortField?: string;
  @Field({ nullable: true })
  sortOrder?: string;
}

@InputType()
export class FilterProduct {
  @Field({ nullable: true })
  q?: string;
  @Field({ nullable: true })
  status?: string;
  @Field({ nullable: true })
  updatedAt?: Date;
  @Field({ nullable: true })
  createdAt?: Date;
}
