import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Product from '@modules/products/infra/typeorm/entities/Product';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import IProductsRepository from '../repositories/IProductsRepository';
import { classToClass } from 'class-transformer';

interface IRequest {
  id: string;
}

@injectable()
class ListProductByIdService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}

  public async execute({ id }: IRequest): Promise<Product | undefined> {
    let productList = (await this.cacheProvider.recover<Product[]>(
      'products-list'
    )) as Product[];

    if (productList) {
      const productCached = productList.find(product => product.id === id);

      if (productCached) {
        return productCached;
      }
    } else {
      const product = await this.productsRepository.findById(id);

      return classToClass(product);
    }
  }
}

export default ListProductByIdService;
