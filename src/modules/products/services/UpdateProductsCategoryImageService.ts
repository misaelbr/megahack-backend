import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ProductsCategory from '@modules/products/infra/typeorm/entities/ProductsCategory';

import IProductsCategoryRepository from '../repositories/IProductsCategoryRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  id: string;
  categoryFileName: string;
}

@injectable()
class UpdateProductsCategoryImageService {
  constructor(
    @inject('ProductsCategoryRepository')
    private productsCategoryRepository: IProductsCategoryRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}

  public async execute({
    id,
    categoryFileName,
  }: IRequest): Promise<ProductsCategory> {
    const category = await this.productsCategoryRepository.findById(id);

    if (!category) {
      throw new AppError('Category not found!', 404);
    }

    if (category.image) {
      await this.storageProvider.deleteFile(category.image);
    }

    const filename = await this.storageProvider.saveFile(categoryFileName);

    category.image = filename;

    await this.cacheProvider.invalidate('categories-list');

    return await this.productsCategoryRepository.save(category);
  }
}

export default UpdateProductsCategoryImageService;
