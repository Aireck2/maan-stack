import Product from '../../models/Product';

import { escapeRegExp } from '../../helpers/utils';
import mongoose from 'mongoose';
interface Paginated {
  page: number;
  perPage?: number;
  sortField?: string;
  sortOrder?: string;
}
interface Filter {
  q?: string;
  updatedAt?: string;
  createdAt?: string;
  status?: string;
}

class ProductService {
  async list(paginated: Paginated, filter: Filter) {
    const {
      page,
      perPage = 20,
      sortField = 'createdAt',
      sortOrder = 'asc',
    } = paginated;
    const { q = '', updatedAt, createdAt, status } = filter;

    const aggs: any = { $match: {} };

    aggs.$match['isVisible'] = true;

    if (q) {
      const reg = { $regex: new RegExp(escapeRegExp(q.trim()), 'i') };
      aggs.$match['$or'] = [
        { name: reg },
        { slug: reg },
        { 'category.name': reg },
        { 'brand.name': reg },
      ];
    }

    if (updatedAt) {
      aggs.$match['updatedAt'] = { $lte: new Date(updatedAt) };
    }

    if (createdAt) {
      aggs.$match['createdAt'] = { $lte: new Date(createdAt) };
    }

    if (status) {
      aggs.$match['status'] = status;
    }

    const total = await Product.find(aggs.$match).countDocuments();

    const [{ items: products }] = await Product.aggregate([
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

    const response = { pageInfo, products };
    return response;
  }
  async obtain(id: string) {
    return Product.findById(id)
      .then((product) => product?.save())
      .catch((err) => {
        throw new Error(err);
      });
  }

  async create(struct: any) {
    const product = new Product({
      _id: new mongoose.Types.ObjectId(),
      ...struct,
    });

    return product.save();
  }
  async update(id: string, struct: any) {
    return Product.findById(id)
      .then((product) => {
        if (product) {
          product.set(struct);

          return product
            .save()
            .then((product) => product)
            .catch((err) => {
              throw new Error(err);
            });
        } else {
          throw new Error('errors.product.notFound');
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }
}

export default new ProductService();
