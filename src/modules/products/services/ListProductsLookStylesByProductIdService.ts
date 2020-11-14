import { inject, injectable } from 'tsyringe';

import LookStyle from '@modules/looks/infra/typeorm/entities/LookStyle';

import IProductsLookStylesRepository from '@modules/products/repositories/IProductsLookStylesRepository';
import { classToClass } from 'class-transformer';

interface IRequest {
  product_id: string;
}
@injectable()
class ListProductsLookStylesByProductIdService {
  constructor(
    @inject('ProductsLookStylesRepository')
    private productsLookStylesRepository: IProductsLookStylesRepository
  ) {}

  public async execute({
    product_id,
  }: IRequest): Promise<LookStyle[] | undefined> {
    const productsLookStylesList = await this.productsLookStylesRepository.findByProductId(
      product_id
    );

    if (productsLookStylesList) {
      const looks = productsLookStylesList.map<LookStyle>(productsLookStyle => {
        return Object.assign(productsLookStyle.look_style);
      });

      return classToClass(looks);
    }

    return undefined;
  }
}

export default ListProductsLookStylesByProductIdService;
