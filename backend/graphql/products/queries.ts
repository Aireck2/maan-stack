import ProductService from "./services";

export const queries = {
  getProducts: async (root: any, args: any, _context: any) => {
    const { paginated, filter } = args;
    const { pageInfo, products } = await ProductService.list(paginated, filter);
    return { pageInfo, products };
  },
};
