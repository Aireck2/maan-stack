import { IBrand, ICategory } from './../../models/Product';
import ProductService from './services';
import logger from '../../helpers/logger';

interface Args {
  input: {
    id?: string;
    name?: string;
    category?: ICategory;
    brand?: IBrand;
    slug?: string;
    isVisible?: boolean;
    status?: string;
  };
}
export const mutations = {
  addProduct: async (root: any, args: Args, _context: any) => {
    const context = 'CREATE_PRODUCT';

    logger.child({ context }).info('Starting...');
    const {
      input: { name, category, brand, slug, status = 'active' },
    } = args;

    if (!name) {
      throw new Error('errors.product.name.notFound');
    }
    if (!slug) {
      throw new Error('errors.product.slug.notFound');
    }
    if (!category?.name || !category?.slug) {
      throw new Error('errors.product.category.notFound');
    }
    if (!brand?.name || !brand?.slug) {
      throw new Error('errors.product.brand.notFound');
    }

    const struct = {
      name,
      category,
      brand,
      slug,
      status,
      isVisible: true,
    };

    logger.child({ context }).info('Creating product...');
    const product = await ProductService.create(struct);

    logger.child({ context }).info('Finished!...');
    return product;
  },
  updProduct: async (root: any, args: any, _context: any) => {
    const context = 'MODIFY_PRODUCT';

    logger.child({ context }).info('Starting...');
    const {
      input: {
        id,
        name,
        category,
        brand,
        slug,
        isVisible = true,
        status = 'active',
      },
    } = args;

    logger.child({ context }).info('Verifying & Updating product...');

    const product = await ProductService.update(id, {
      name,
      category,
      brand,
      slug,
      status,
      isVisible,
    });

    logger.child({ context }).info('Finished!');
    return product;
  },
};
