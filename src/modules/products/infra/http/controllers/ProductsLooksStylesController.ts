import { Request, Response } from 'express';

import { container } from 'tsyringe';

import ListProductsLookStylesByLookStylesIdService from '@modules/products/services/ListProductsLookStylesByLookStylesIdService';
import ListProductsLookStylesByProductIdService from '@modules/products/services/ListProductsLookStylesByProductIdService';
import AppError from '@shared/errors/AppError';
import CreateProductsLookStylesServices from '@modules/products/services/CreateProductsLookStylesService';

class ProductsLookStylesController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { look_styles_id } = request.params;

    const findProductsByLookStyles = container.resolve(
      ListProductsLookStylesByLookStylesIdService
    );

    const products = await findProductsByLookStyles.execute({ look_styles_id });

    return response.json(products);
  }

  public async read(request: Request, response: Response): Promise<Response> {
    const { product_id } = request.params;

    const findLooksByProductId = container.resolve(
      ListProductsLookStylesByProductIdService
    );

    const looksStylesProducts = await findLooksByProductId.execute({
      product_id,
    });

    return response.json(looksStylesProducts);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { product_id, look_styles_id } = request.body;

    const newProductLookStyle = container.resolve(
      CreateProductsLookStylesServices
    );

    const productLookStyle = await newProductLookStyle.execute({
      product_id,
      look_styles_id,
    });

    return response.json(productLookStyle);
  }
}

export default ProductsLookStylesController;
