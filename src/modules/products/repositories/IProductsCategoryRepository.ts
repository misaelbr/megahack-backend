import ProductsCategory from '../infra/typeorm/entities/ProductsCategory';

import ICreateProductsCategoryDTO from '../dtos/ICreateProductsCategoryDTO';

export default interface IProductsCategoryRepository {
  create(data: ICreateProductsCategoryDTO): Promise<ProductsCategory>;
  save(data: ICreateProductsCategoryDTO): Promise<ProductsCategory>;
  findById(id: string): Promise<ProductsCategory | undefined>;
  findAllCategories(): Promise<ProductsCategory[] | undefined>;
  findCategoryByName(name: string): Promise<ProductsCategory | undefined>;
}
