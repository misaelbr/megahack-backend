import Product from '../infra/typeorm/entities/Product';

import ICreateProductDTO from '../dtos/ICreateProductDTO';
import IFindAllProductsByCatAntGenderDTO from '../dtos/IFindAllProductsByCatAndGenderDTO';

export default interface IProductsRepository {
  create(data: ICreateProductDTO): Promise<Product>;
  save(data: Product): Promise<Product>;
  findById(id: string): Promise<Product | undefined>;
  findAllProducts(): Promise<Product[] | undefined>;
  findAllProductsByCategoryId(
    category_id: string
  ): Promise<Product[] | undefined>;
  findAllProductsByGender(gender: string): Promise<Product[] | undefined>;
  findAllProductsByColor(color: string): Promise<Product[] | undefined>;
  findAllProductsByCategoryIdAndGender(
    data: IFindAllProductsByCatAntGenderDTO
  ): Promise<Product[] | undefined>;
}
