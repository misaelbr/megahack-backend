import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Product from '@modules/products/infra/typeorm/entities/Product';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import IProductsRepository from '../repositories/IProductsRepository';
import { classToClass } from 'class-transformer';
import { th } from 'date-fns/locale';

interface IRequest {
  name: string;
  color: string;
  size: string;
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
    price,
    description,
    gender,
    category_id,
  }: IRequest): Promise<Product> {
    const product = await this.productsRepository.create({
      name,
      color,
      size,
      price,
      description,
      gender,
      category_id,
    });

    await this.productsRepository.save(product);

    await this.cacheProvider.invalidate('products-list');

    return classToClass(product);
  }
}

export default CreateProductService;
