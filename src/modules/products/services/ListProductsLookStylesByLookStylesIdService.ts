import { inject, injectable } from 'tsyringe';

import ProductsLookStyles from '@modules/products/infra/typeorm/entities/ProductsLookStyles';

import IProductsLookStylesRepository from '@modules/products/repositories/IProductsLookStylesRepository';
import Product from '../infra/typeorm/entities/Product';

interface IRequest {
  look_styles_id: string;
}

@injectable()
class ListProductsLookStylesByLookStylesIdService {
  constructor(
    @inject('ProductsLookStylesRepository')
    private productsLookStylesRepository: IProductsLookStylesRepository
  ) {}

  public async execute({
    look_styles_id,
  }: IRequest): Promise<
    | Omit<
        Product,
        'category' | 'order_products' | 'product_look_styles' | 'getimageUrl'
      >[]
    | undefined
  > {
    const productsLookStylesList = await this.productsLookStylesRepository.findByLookStylesId(
      look_styles_id
    );

    if (productsLookStylesList) {
      const products = productsLookStylesList.map<
        Omit<
          Product,
          'category' | 'order_products' | 'product_look_styles' | 'getimageUrl'
        >
      >(productLookStyles => ({
        id: productLookStyles.product_id,
        name: productLookStyles.product.name,
        description: productLookStyles.product.description,
        color: productLookStyles.product.color,
        gender: productLookStyles.product.gender,
        size: productLookStyles.product.size,
        price: productLookStyles.product.price,
        brand: productLookStyles.product.brand,
        category_id: productLookStyles.product.category_id,
        quantity: productLookStyles.product.quantity,
        image: productLookStyles.product.image,
        created_at: productLookStyles.product.created_at,
        updated_at: productLookStyles.product.updated_at,
      }));

      return products;
    }

    return undefined;
  }
}

export default ListProductsLookStylesByLookStylesIdService;
