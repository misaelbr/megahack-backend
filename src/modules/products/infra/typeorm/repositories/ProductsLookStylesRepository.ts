import { Repository, getRepository } from 'typeorm';

import IProductsLookStyles from '@modules/products/repositories/IProductsLookStylesRepository';
import ICreateProductsLookStylesDTO from '@modules/products/dtos/ICreateProductsLookStylesDTO';
import ProductsLookStyles from '../entities/ProductsLookStyles';

class ProductsLookStylesRepository implements IProductsLookStyles {
  private ormRepository: Repository<ProductsLookStyles>;

  public constructor() {
    this.ormRepository = getRepository(ProductsLookStyles);
  }

  public async create({
    product_id,
    look_styles_id,
  }: ICreateProductsLookStylesDTO): Promise<ProductsLookStyles> {
    const productsLookStyles = this.ormRepository.create({
      product_id,
      look_styles_id,
    });

    await this.ormRepository.save(productsLookStyles);

    return productsLookStyles;
  }

  public async save(
    productsLookStyles: ProductsLookStyles
  ): Promise<ProductsLookStyles> {
    return await this.ormRepository.save(productsLookStyles);
  }

  public async findByProductId(
    product_id: string
  ): Promise<ProductsLookStyles[] | undefined> {
    const productsLookStylesList = await this.ormRepository.find({
      where: { product_id },
      relations: ['look_style'],
    });

    return productsLookStylesList;
  }

  public async findByLookStylesId(
    look_styles_id: string
  ): Promise<ProductsLookStyles[] | undefined> {
    const productsLookStylesList = await this.ormRepository.find({
      where: { look_styles_id },
      relations: ['product'],
    });

    return productsLookStylesList;
  }
}

export default ProductsLookStylesRepository;
