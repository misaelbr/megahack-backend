import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Product from '@modules/products/infra/typeorm/entities/Product';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import IProductsRepository from '../repositories/IProductsRepository';
import { classToClass } from 'class-transformer';
interface IRequest {
  id: string;
  name: string;
  color: string;
  size: string;
  brand: string;
  quantity: number;
  price: number;
  description: string;
  gender: string;
  category_id: string;
}

@injectable()
class UpdateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}

  public async execute({
    id,
    name,
    color,
    size,
    brand,
    quantity,
    price,
    description,
    gender,
    category_id,
  }: IRequest): Promise<Product> {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new AppError('Product not found!', 404);
    }

    product.name = name;
    product.color = color;
    product.size = size;
    product.brand = brand;
    product.quantity = quantity;
    product.price = price;
    product.description = description;
    product.gender = gender;
    product.category_id = category_id;

    await this.cacheProvider.invalidate('products-list');

    return await this.productsRepository.save(product);
  }
}

export default UpdateProductService;
