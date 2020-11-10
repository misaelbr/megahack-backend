import { inject, injectable } from 'tsyringe';

import Product from '@modules/products/infra/typeorm/entities/Product';
import IProductsRepository from '../repositories/IProductsRepository';
import { classToClass } from 'class-transformer';

interface IRequest {
  category_id: string;
  gender: string;
}

@injectable()
class ListProductsByCategoryIdAndGenderService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository
  ) {}

  public async execute({
    category_id,
    gender,
  }: IRequest): Promise<Product[] | undefined> {
    const products = await this.productsRepository.findAllProductsByCategoryIdAndGender(
      { category_id, gender }
    );

    return classToClass(products);
  }
}

export default ListProductsByCategoryIdAndGenderService;
