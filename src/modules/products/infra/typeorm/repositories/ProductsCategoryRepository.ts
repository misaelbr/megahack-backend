import { getRepository, Repository } from 'typeorm';

import IProductsCategoryRepository from '@modules/products/repositories/IProductsCategoryRepository';
import ICreateProductsCategoryDTO from '@modules/products/dtos/ICreateProductsCategoryDTO';

import ProductsCategory from '../entities/ProductsCategory';

class ProductsCategoryRepository implements IProductsCategoryRepository {
  private ormRepository: Repository<ProductsCategory>;

  constructor() {
    this.ormRepository = getRepository(ProductsCategory);
  }

  public async create(
    data: ICreateProductsCategoryDTO
  ): Promise<ProductsCategory> {
    const productCategory = this.ormRepository.create(data);

    await this.ormRepository.save(productCategory);

    return productCategory;
  }

  public async save(
    productCategory: ProductsCategory
  ): Promise<ProductsCategory> {
    return await this.ormRepository.save(productCategory);
  }

  public async findById(id: string): Promise<ProductsCategory | undefined> {
    const productCategory = await this.ormRepository.findOne({
      where: { id },
    });

    return productCategory;
  }

  public async findAllCategories(): Promise<ProductsCategory[] | undefined> {
    const productsCategory = await this.ormRepository.find();

    return productsCategory;
  }

  public async findCategoryByName(
    name: string
  ): Promise<ProductsCategory | undefined> {
    const productCategory = await this.ormRepository.findOne({
      where: { name },
    });

    return productCategory;
  }
}

export default ProductsCategoryRepository;
