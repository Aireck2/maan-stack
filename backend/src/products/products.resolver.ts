import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { PaginatedProduct, Product } from './product.entity';
import { ProductsService } from './products.service';

import { InputAddProduct } from './dto/create-product.input';
import { Paginated, FilterProduct } from './dto/get-product.input';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private productsService: ProductsService) {}

  @Query(() => PaginatedProduct)
  getProducts(
    @Args('paginated')
    paginated: Paginated,
    @Args('filter', { nullable: true })
    filter?: FilterProduct,
  ): Promise<PaginatedProduct> {
    return this.productsService.findAll(paginated, filter);
  }

  @Mutation(() => Product)
  addProduct(@Args('input') input: InputAddProduct): Promise<Product> {
    const newProduct = this.productsService.create(input);
    return newProduct;
  }
}
