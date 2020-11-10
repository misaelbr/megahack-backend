import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ProductsCategory from '@modules/products/infra/typeorm/entities/ProductsCategory';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import IProductsCategoryRepository from '../repositories/IProductsCategoryRepository';
import { classToClass } from 'class-transformer';

interface IRequest {
  name: string;
}

@injectable()
class ListProductsCategoryByNameService {
  constructor(
    @inject('ProductsCategoryRepository')
    private productsCategoryRepository: IProductsCategoryRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}

  public async execute({
    name,
  }: IRequest): Promise<ProductsCategory | undefined> {
    let categoriesList = (await this.cacheProvider.recover<ProductsCategory[]>(
      'categories-list'
    )) as ProductsCategory[];

    if (categoriesList) {
      const result = categoriesList.find(category => category.name === name);

      if (result) {
        return result;
      }
    } else {
      const category = await this.productsCategoryRepository.findCategoryByName(
        name
      );

      return classToClass(category);
    }
  }
}

export default ListProductsCategoryByNameService;
