import logger from '../../helpers/logger';
import ProductService from './services';

export const queries = {
  getProducts: async (root: any, args: any, _context: any) => {
    const { paginated, filter } = args;
    const { pageInfo, products } = await ProductService.list(paginated, filter);
    return { pageInfo, products };
  },
  getProduct: async (root: any, args: any, _context: any) => {
    const context = 'GET_PRODUCT';
    logger.child({ context }).info('Starting...');
    const {
      input: { id },
    } = args;

    logger.child({ context }).info('Finding product...');
    const buyer: any = await ProductService.obtain(id);

    logger.child({ context }).info('Finished!');
    return buyer;
  },
};
