import { gql } from 'apollo-angular';

export const queryListProducts = gql`
  query getProducts($paginated: Paginated!, $filter: FilterProduct) {
    getProducts(paginated: $paginated, filter: $filter) {
      pageInfo {
        page
        perPage
        total
      }
      products {
        _id
        name
        brand {
          name
          slug
        }
        category {
          name
          slug
        }
        slug
        status
        createdAt
        updatedAt
      }
    }
  }
`;
