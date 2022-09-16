import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { PaginatedProduct, Product } from './product.entity';
import { ProductsService } from './products.service';

import {
  InputAddProduct,
  InputUpdProduct,
  InputGetProduct,
} from './dto/create-product.input';
import { Paginated, FilterProduct } from './dto/get-product.input';
import { NotFoundException } from '@nestjs/common';

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
  @Query(() => Product)
  getProduct(@Args('input') input: InputGetProduct) {
    const product = this.productsService.obtain(input);
    return product;
  }

  @Mutation(() => Product)
  addProduct(@Args('input') input: InputAddProduct): Promise<Product> {
    const newProduct = this.productsService.create(input);
    return newProduct;
  }
  @Mutation(() => Product)
  updProduct(@Args('input') input: InputUpdProduct) {
    const product = this.productsService.obtain(input);
    if (!product) {
      throw new NotFoundException(`Order ${input._id} not found`);
    }
    const editProduct = this.productsService.update(input);
    return editProduct;
  }
}
