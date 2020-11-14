import { inject, injectable } from 'tsyringe';

import IProductsLookStylesRepository from '@modules/products/repositories/IProductsLookStylesRepository';
import Product from '../infra/typeorm/entities/Product';
import { classToClass } from 'class-transformer';

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
  }: IRequest): Promise<Product[] | undefined> {
    const productsLookStylesList = await this.productsLookStylesRepository.findByLookStylesId(
      look_styles_id
    );

    if (productsLookStylesList) {
      const products = productsLookStylesList.map<Product>(
        productLookStyles => {
          return Object.assign(productLookStyles.product);
        }
      );

      return classToClass(products);
    }

    return undefined;
  }
}

export default ListProductsLookStylesByLookStylesIdService;
