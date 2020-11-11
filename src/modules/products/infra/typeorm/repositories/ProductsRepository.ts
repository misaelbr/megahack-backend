import { getRepository, Repository } from 'typeorm';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';

import Product from '../entities/Product';
import IFindAllProductsByCatAntGenderDTO from '@modules/products/dtos/IFindAllProductsByCatAndGenderDTO';

class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }
  public async findById(id: string): Promise<Product | undefined> {
    throw new Error('Method not implemented.');
  }
  public async create(data: ICreateProductDTO): Promise<Product> {
    const product = this.ormRepository.create(data);

    await this.ormRepository.save(product);

    return product;
  }
  public async save(data: Product): Promise<Product> {
    return await this.ormRepository.save(data);
  }

  public async findAllProducts(): Promise<Product[] | undefined> {
    return this.ormRepository.find();
  }

  public async findAllProductsByCategoryId(
    category_id: string
  ): Promise<Product[] | undefined> {
    const products = await this.ormRepository.find({
      where: { category_id },
    });

    return products;
  }

  public async findAllProductsByGender(
    gender: string
  ): Promise<Product[] | undefined> {
    const products = await this.ormRepository.find({
      where: { gender },
    });

    return products;
  }
  public async findAllProductsByColor(
    color: string
  ): Promise<Product[] | undefined> {
    const products = await this.ormRepository.find({
      where: { color },
    });

    return products;
  }
  public async findAllProductsByCategoryIdAndGender({
    category_id,
    gender,
  }: IFindAllProductsByCatAntGenderDTO): Promise<Product[] | undefined> {
    const products = this.ormRepository.find({
      where: { category_id, gender },
    });

    return products;
  }
}
export default ProductsRepository;
