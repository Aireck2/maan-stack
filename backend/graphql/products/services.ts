import Product from "../../models/Product";

import { escapeRegExp } from "../../helpers/utils";
import mongoose from "mongoose";

class ProductService {
  async list(paginated: any, filter?: any) {
    const { page, perPage, sortField, sortOrder } = paginated;
    const { q, updatedAt, createdAt, status } = filter;

    const aggs: any = { $match: {} };

    if (q) {
      const reg = { $regex: new RegExp(escapeRegExp(q.trim()), "i") };
      aggs.$match["$or"] = [
        { "name": reg },
        { "slug": reg },
        { "category.name": reg },
      ];
    }

    if (updatedAt) {
      aggs.$match["updatedAt"] = { $lte: new Date(updatedAt) };
    }

    if (createdAt) {
      aggs.$match["createdAt"] = { $lte: new Date(createdAt) };
    }

    if (status) {
      aggs.$match["status"] = status;
    }

    const total = await Product.find(aggs.$match).countDocuments();

    const [{ items: products }] = await Product.aggregate([
      {
        $sort: {
          [sortField || "createdAt"]: sortOrder === "asc" ? 1 : -1,
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
      currentPage: page,
      perPage,
      hasPreviousPage: page > 1,
      hasNextPage: total > page * perPage,
    };

    const response = { pageInfo, products };
    return response;
  }

  async create(struct: any) {
    const product = new Product({
      _id: new mongoose.Types.ObjectId(),
      ...struct,
    });

    return product.save();
  }
}

export default new ProductService();
