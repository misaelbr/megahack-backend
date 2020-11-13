import { inject, injectable } from 'tsyringe';

import ProductsLookStyles from '@modules/products/infra/typeorm/entities/ProductsLookStyles';

import IProductsLookStylesRepository from '@modules/products/repositories/IProductsLookStylesRepository';

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
  }: IRequest): Promise<ProductsLookStyles[] | undefined> {
    const productsLookStyles = await this.productsLookStylesRepository.findByProductId(
      product_id
    );

    return productsLookStyles;
  }
}

export default ListProductsLookStylesByProductIdService;
