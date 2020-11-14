import { inject, injectable } from 'tsyringe';

import Product from '@modules/products/infra/typeorm/entities/Product';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import IProductsRepository from '../repositories/IProductsRepository';
import { classToClass } from 'class-transformer';
interface IRequest {
  name: string;
  color: string;
  size: string;
  brand: string;
  quantity: number;
  price: number;
  description: string;
  gender: string;
  category_id: string;
}

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}

  public async execute({
    name,
    color,
    size,
    brand,
    quantity,
    price,
    description,
    gender,
    category_id,
  }: IRequest): Promise<Product> {
    const product = await this.productsRepository.create({
      name,
      color,
      size,
      brand,
      quantity,
      price,
      description,
      gender,
      category_id,
    });

    await this.cacheProvider.invalidate('products-list');

    return classToClass(product);
  }
}

export default CreateProductService;
