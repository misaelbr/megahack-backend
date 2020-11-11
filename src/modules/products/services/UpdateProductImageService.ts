import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Product from '@modules/products/infra/typeorm/entities/Product';

import IProductsRepository from '../repositories/IProductsRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  id: string;
  productFileName: string;
}

@injectable()
class UpdateProductImageService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}

  public async execute({ id, productFileName }: IRequest): Promise<Product> {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new AppError('Product not found!', 404);
    }

    if (product.image) {
      await this.storageProvider.deleteFile(product.image);
    }

    const filename = await this.storageProvider.saveFile(productFileName);

    product.image = filename;

    await this.cacheProvider.invalidate('products-list');

    return await this.productsRepository.save(product);
  }
}

export default UpdateProductImageService;
