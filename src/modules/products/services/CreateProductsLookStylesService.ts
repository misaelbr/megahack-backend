import { inject, injectable } from 'tsyringe';

import ProductsLookStyles from '@modules/products/infra/typeorm/entities/ProductsLookStyles';

import IProductsLookStylesRepository from '@modules/products/repositories/IProductsLookStylesRepository';
import ICreateProductsLookStylesDTO from '../dtos/ICreateProductsLookStylesDTO';

@injectable()
class CreateProductsLookStylesServices {
  constructor(
    @inject('ProductsLookStylesRepository')
    private productsLookStylesRepository: IProductsLookStylesRepository
  ) {}

  public async execute({
    product_id,
    look_styles_id,
  }: ICreateProductsLookStylesDTO): Promise<ProductsLookStyles> {
    const productLookStyles = await this.productsLookStylesRepository.create({
      product_id,
      look_styles_id,
    });

    return productLookStyles;
  }
}

export default CreateProductsLookStylesServices;
