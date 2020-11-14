import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateProductService from '@modules/products/services/CreateProductService';
import UpdateProductService from '@modules/products/services/UpdateProductService';
import ListProductService from '@modules/products/services/ListProductsService';
import ListProductByIdService from '@modules/products/services/ListProductByIdService';

export default class ProductsController {
  public async index(request: Request, response: Response): Promise<Response> {
    try {
      const listProducts = container.resolve(ListProductService);

      const products = await listProducts.execute();

      return response.json(products);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const {
        name,
        color,
        size,
        brand,
        quantity,
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
        quantity,
        price,
        description,
        gender,
        category_id,
      });

      return response.json(product);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async show(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      const prod = container.resolve(ListProductByIdService);

      const product = await prod.execute({ id });

      return response.json(product);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const {
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
      } = request.body;

      const updateProduct = container.resolve(UpdateProductService);

      const product = await updateProduct.execute({
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
      });

      return response.json(product);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
