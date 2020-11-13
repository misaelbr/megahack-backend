import ProductsLookStyles from '../infra/typeorm/entities/ProductsLookStyles';

import ProductsLookStylesDTO from '../dtos/ICreateProductsLookStylesDTO';

export default interface ICreateProductsLookStylesRepository {
  create(
    productsLookStylesData: ProductsLookStylesDTO
  ): Promise<ProductsLookStyles>;
  save(productsLookStyles: ProductsLookStyles): Promise<ProductsLookStyles>;
  findByProductId(
    product_id: string
  ): Promise<ProductsLookStyles[] | undefined>;
  findByLookStylesId(
    look_styles_id: string
  ): Promise<ProductsLookStyles[] | undefined>;
}
