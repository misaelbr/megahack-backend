import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateProductsCategoryService from '@modules/products/services/CreateProductsCategoryService';
import ListProductsCategoryService from '@modules/products/services/ListProductsCategoryService';

export default class ProductsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listCategories = container.resolve(ListProductsCategoryService);

    const categories = await listCategories.execute();

    return response.json(categories);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    const createProductCategory = container.resolve(
      CreateProductsCategoryService
    );

    const category = await createProductCategory.execute({
      name,
      description,
    });

    return response.json(category);
  }
}
