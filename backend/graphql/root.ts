/* eslint-disable */
import { gql } from "apollo-server-express";

import {
  schema as adminsSchema,
  queries as adminsQueries,
  mutations as adminsMutations,
} from "./products";

const rootTypeDefs = gql`
  type Query {
    _: String
  }

  type Mutation {
    _: String
  }

  input Paginated {
    page: Int!
    perPage: Int
    sortField: String
    sortOrder: String
  }

  input InputFile {
    uid: String
    type: String
    name: String
    url: String
  }

  type PageInfo {
    total: Int
    currentPage: Int
    perPage: Int
    hasPreviousPage: Boolean
    hasNextPage: Boolean
  }

  type SummaryAccount {
    company: String
    ruc: String
    contact: String
    email: String
    cellNumber: String
  }

  type File {
    uid: String
    status: String
    key: String
    name: String
    type: String
    url: String
  }
`;

export const typeDefs = [rootTypeDefs, adminsSchema];

export const resolvers = {
  Query: {
    ...adminsQueries,
  },
  Mutation: {
    ...adminsMutations,
  },
};
