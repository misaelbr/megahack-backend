import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ProductsCategory from '@modules/products/infra/typeorm/entities/ProductsCategory';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import IProductsCategoryRepository from '../repositories/IProductsCategoryRepository';
import { classToClass } from 'class-transformer';

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateProductsCategoryService {
  constructor(
    @inject('ProductsCategoryRepository')
    private productsCategoryRepository: IProductsCategoryRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}

  public async execute({
    name,
    description,
  }: IRequest): Promise<ProductsCategory> {
    const checkCategoryExists = await this.productsCategoryRepository.findCategoryByName(
      name
    );

    if (checkCategoryExists) {
      throw new AppError('Category already in use');
    }

    const category = await this.productsCategoryRepository.create({
      name,
      description,
    });

    await this.cacheProvider.invalidate('categories-list');

    return classToClass(category);
  }
}

export default CreateProductsCategoryService;
