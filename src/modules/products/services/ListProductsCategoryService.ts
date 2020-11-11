import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ProductsCategory from '@modules/products/infra/typeorm/entities/ProductsCategory';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import IProductsCategoryRepository from '../repositories/IProductsCategoryRepository';
import { classToClass } from 'class-transformer';

@injectable()
class ListProductsCategoryServices {
  constructor(
    @inject('ProductsCategoryRepository')
    private productsCategoryRepository: IProductsCategoryRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}

  public async execute(): Promise<ProductsCategory[] | undefined> {
    let categoriesList = (await this.cacheProvider.recover<ProductsCategory[]>(
      'categories-list'
    )) as ProductsCategory[];

    if (categoriesList) {
      return categoriesList;
    }

    const categories = await this.productsCategoryRepository.findAllCategories();

    await this.cacheProvider.save('categories-list', classToClass(categories));

    return classToClass(categories);
  }
}

export default ListProductsCategoryServices;
