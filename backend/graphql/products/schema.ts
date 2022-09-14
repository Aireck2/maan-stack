/* eslint-disable */
import { gql } from "apollo-server-express";

export const schema: any = gql`
  type Query {
    getProducts(paginated: Paginated, filter: FilterProduct): PaginatedProduct
  }

  type Mutation {
    addProduct(input: InputAddProduct): Product
    # updProduct(input: InputUpdProduct): Product
  }

  scalar Timestamp

  input Paginated {
    page: Int!
    perPage: Int
    sortField: String
    sortOrder: String
  }

  input FilterProduct {
    q: String
    status: String
    updatedAt: Timestamp
    createdAt: Timestamp
  }

  input InputAddProduct {
    name: String!
    category: InputCategory!
    brand: InputBrand!
    slug: String!
  }
  input InputUpdProduct {
    name: String!
    category: InputCategory!
    brand: InputBrand!
    slug: String!
    status: String!
  }

  type PageInfo {
    total: Int
    currentPage: Int
    perPage: Int
    hasPreviousPage: Boolean
    hasNextPage: Boolean
  }

  type PaginatedProduct {
    pageInfo: PageInfo
    products: [Product]
  }

  type Product {
    _id: ID
    name: String
    category: Category
    brand: Brand
    slug: String
    status: String
    createdAt: Timestamp
    updatedAt: Timestamp
  }

  input InputCategory {
    name: String
    slug: String
  }

  type Category {
    name: String
    slug: String
  }

  type Brand {
    name: String
    slug: String
  }
  input InputBrand {
    name: String
    slug: String
  }
`;
