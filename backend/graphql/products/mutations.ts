import ProductService from "./services";

export const mutations = {
  addProduct: async (root: any, args: any, _context: any) => {
    const ctx = "CREATE_PRODUCT";
    const {
      input: { name, category, brand, slug },
    } = args;

    if (!name) {
      throw new Error("errors.product.name.notFound");
    }
    if (!slug) {
      throw new Error("errors.product.slug.notFound");
    }
    if (!category?.name || !category?.slug) {
      throw new Error("errors.product.category.notFound");
    }
    if (!brand?.name || !brand?.slug) {
      throw new Error("errors.product.brand.notFound");
    }

    const struct = {
      name,
      category,
      brand,
      slug,
      status: "active",
    };
    const product = await ProductService.create(struct);

    return product;
  },
};
