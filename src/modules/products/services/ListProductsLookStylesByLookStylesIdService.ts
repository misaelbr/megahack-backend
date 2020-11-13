import { inject, injectable } from 'tsyringe';

import ProductsLookStyles from '@modules/products/infra/typeorm/entities/ProductsLookStyles';

import IProductsLookStylesRepository from '@modules/products/repositories/IProductsLookStylesRepository';

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
  }: IRequest): Promise<ProductsLookStyles[] | undefined> {
    const productsLookStyles = await this.productsLookStylesRepository.findByLookStylesId(
      look_styles_id
    );

    return productsLookStyles;
  }
}

export default ListProductsLookStylesByLookStylesIdService;
