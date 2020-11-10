import { inject, injectable } from 'tsyringe';

import Product from '@modules/products/infra/typeorm/entities/Product';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import IProductsRepository from '../repositories/IProductsRepository';
import { classToClass } from 'class-transformer';

interface IRequest {
  category_id: string;
}

@injectable()
class ListProductsByCategoryIdService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}

  public async execute({
    category_id,
  }: IRequest): Promise<Product[] | undefined> {
    let productList = (await this.cacheProvider.recover<Product[]>(
      'products-list'
    )) as Product[];

    if (productList) {
      const productCached = productList.filter(
        products => products.category_id === category_id
      );
      if (productCached) {
        return productCached;
      }
    } else {
      const product = await this.productsRepository.findAllProductsByCategoryId(
        category_id
      );

      return classToClass(product);
    }
  }
}

export default ListProductsByCategoryIdService;
