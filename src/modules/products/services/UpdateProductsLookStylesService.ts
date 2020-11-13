import { inject, injectable } from 'tsyringe';

import ProductsLookStyles from '@modules/products/infra/typeorm/entities/ProductsLookStyles';

import IProductsLookStylesRepository from '@modules/products/repositories/IProductsLookStylesRepository';

@injectable()
class UpdateProductsLookStylesServices {
  constructor(
    @inject('ProductsLookStylesRepository')
    private productsLookStylesRepository: IProductsLookStylesRepository
  ) {}

  public async execute(
    productLookStyles: ProductsLookStyles
  ): Promise<ProductsLookStyles> {
    const updatedProductLookStyles = await this.productsLookStylesRepository.save(
      productLookStyles
    );

    return updatedProductLookStyles;
  }
}

export default UpdateProductsLookStylesServices;
