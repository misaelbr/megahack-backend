import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Product from '@modules/products/infra/typeorm/entities/ProductsCategory';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import IProductsCategoryRepository from '../repositories/IProductsCategoryRepository';
import { classToClass } from 'class-transformer';
interface IRequest {
  id: string;
  name: string;
  description: string;
}

@injectable()
class UpdateProductService {
  constructor(
    @inject('ProductsCategoryRepository')
    private productsCategoryRepository: IProductsCategoryRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}

  public async execute({ id, name, description }: IRequest): Promise<Product> {
    const category = await this.productsCategoryRepository.findById(id);

    if (!category) {
      throw new AppError('Product not found!', 404);
    }

    category.name = name;
    category.description = description;

    await this.cacheProvider.invalidate('categories-list');

    return await this.productsCategoryRepository.save(category);
  }
}

export default UpdateProductService;
