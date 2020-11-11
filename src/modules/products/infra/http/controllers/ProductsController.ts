import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateProductService from '@modules/products/services/CreateProductService';
import ListProductService from '@modules/products/services/ListProductsService';

export default class ProductsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listProducts = container.resolve(ListProductService);

    const products = await listProducts.execute();

    return response.json(products);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      color,
      size,
      brand,
      price,
      description,
      gender,
      category_id,
    } = request.body;

    const createProduct = container.resolve(CreateProductService);

    const product = await createProduct.execute({
      name,
      color,
      size,
      brand,
      price,
      description,
      gender,
      category_id,
    });

    return response.json(product);
  }
}
