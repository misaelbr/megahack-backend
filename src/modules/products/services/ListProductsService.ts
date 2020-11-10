import { inject, injectable } from 'tsyringe';

import Product from '@modules/products/infra/typeorm/entities/Product';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import IProductsRepository from '../repositories/IProductsRepository';
import { classToClass } from 'class-transformer';

@injectable()
class ListProductsService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}

  public async execute(): Promise<Product[] | undefined> {
    let productList = (await this.cacheProvider.recover<Product[]>(
      'products-list'
    )) as Product[];

    if (productList) {
      return productList;
    }

    const products = await this.productsRepository.findAllProducts();

    await this.cacheProvider.save('products-list', classToClass(products));

    return classToClass(products);
  }
}

export default ListProductsService;
