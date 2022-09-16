import { Product, ProductDocument } from './product.schema';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { PaginatedProduct } from './product.entity';
import {
  InputAddProduct,
  InputGetProduct,
  InputUpdProduct,
} from './dto/create-product.input';
import { FilterProduct, Paginated } from './dto/get-product.input';
import { escapeRegExp } from 'src/helpers/utils';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private productModel: Model<ProductDocument>,
  ) {}

  async findAll(
    paginated: Paginated,
    filter: FilterProduct,
  ): Promise<PaginatedProduct> {
    const {
      page,
      perPage = 20,
      sortField = 'createdAt',
      sortOrder = 'asc',
    } = paginated;

    const aggs: any = { $match: {} };
    aggs.$match['isVisible'] = true;

    if (filter?.q) {
      const reg = { $regex: new RegExp(escapeRegExp(filter.q.trim()), 'i') };
      aggs.$match['$or'] = [
        { name: reg },
        { slug: reg },
        { 'category.name': reg },
        { 'brand.name': reg },
      ];
    }

    if (filter?.updatedAt) {
      aggs.$match['updatedAt'] = { $lte: new Date(filter.updatedAt) };
    }

    if (filter?.createdAt) {
      aggs.$match['createdAt'] = { $lte: new Date(filter.createdAt) };
    }

    if (filter?.status) {
      aggs.$match['status'] = status;
    }

    const total = await this.productModel.find(aggs.$match).countDocuments();

    const [{ items: products }] = await this.productModel.aggregate([
      {
        $sort: {
          [sortField]: sortOrder === 'asc' ? 1 : -1,
        },
      },
      {
        $facet: {
          items: [aggs, { $skip: (page - 1) * perPage }, { $limit: perPage }],
        },
      },
    ]);
    const pageInfo = {
      total,
      page: page,
      perPage,
      hasPreviousPage: page > 1,
      hasNextPage: total > page * perPage,
    };

    return { pageInfo, products };
  }

  async obtain(input: InputGetProduct) {
    const product = await this.productModel.findOne({ _id: input._id });
    if (!product) {
      throw new NotFoundException('product.notFound');
    }
    return product;
  }

  async create(input: InputAddProduct): Promise<Product> {
    const struct = {
      ...input,
      active: 'active',
      isVisible: true,
    };

    const newProduct = new this.productModel(struct);
    return newProduct.save();
  }

  async update(input: InputUpdProduct) {
    const product = await this.productModel.findOne({ _id: input._id });
    if (!product) {
      throw new NotFoundException('product.notFound');
    }

    product.set({ ...input });
    return await product.save();
  }
}
