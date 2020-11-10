import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ProductsCategory from '@modules/products/infra/typeorm/entities/ProductsCategory';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import IProductsCategoryRepository from '../repositories/IProductsCategoryRepository';
import { classToClass } from 'class-transformer';

interface IRequest {
  category_id: string;
}

@injectable()
class ListProductsCategoryByIdService {
  constructor(
    @inject('ProductsCategoryRepository')
    private productsCategoryRepository: IProductsCategoryRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}

  public async execute({
    category_id,
  }: IRequest): Promise<ProductsCategory | undefined> {
    let categoriesList = (await this.cacheProvider.recover<ProductsCategory[]>(
      'categories-list'
    )) as ProductsCategory[];

    if (categoriesList) {
      const categoryCached = categoriesList.find(
        category => category.id === category_id
      );

      if (categoryCached) {
        return categoryCached;
      }
    } else {
      const category = await this.productsCategoryRepository.findById(
        category_id
      );

      return classToClass(category);
    }
  }
}

export default ListProductsCategoryByIdService;
