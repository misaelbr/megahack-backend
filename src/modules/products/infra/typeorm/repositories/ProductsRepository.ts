import { getRepository, Repository, In } from 'typeorm';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import IUpdateProductsQuantityDTO from '@modules/products/dtos/IUpdateProductsQuantityDTO';

import Product from '../entities/Product';
import IFindAllProductsByCatAntGenderDTO from '@modules/products/dtos/IFindAllProductsByCatAndGenderDTO';

interface IFindProducts {
  id: string;
}

class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }
  public async findById(id: string): Promise<Product | undefined> {
    const product = this.ormRepository.findOne(id);

    return product;
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

  public async findAllById(products: IFindProducts[]): Promise<Product[]> {
    const productIds = products.map(product => product.id);

    const existentProducts = await this.ormRepository.find({
      where: {
        id: In(productIds),
      },
    });

    return existentProducts;
  }

  public async updateQuantity(
    products: IUpdateProductsQuantityDTO[]
  ): Promise<Product[]> {
    return await this.ormRepository.save(products);
  }
}

export default ProductsRepository;
