import { inject, injectable } from 'tsyringe';

import Product from '@modules/products/infra/typeorm/entities/Product';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import IProductsRepository from '../repositories/IProductsRepository';
import { classToClass } from 'class-transformer';

interface IRequest {
  gender: string;
}

@injectable()
class ListProductsByGenderService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}

  public async execute({ gender }: IRequest): Promise<Product[] | undefined> {
    let productList = (await this.cacheProvider.recover<Product[]>(
      'products-list'
    )) as Product[];

    if (productList) {
      const productCached = productList.filter(
        products => products.gender === gender
      );
      if (productCached) {
        return productCached;
      }
    } else {
      const product = await this.productsRepository.findAllProductsByGender(
        gender
      );

      return classToClass(product);
    }
  }
}

export default ListProductsByGenderService;
