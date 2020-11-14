import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateProductsCategoryService from '@modules/products/services/CreateProductsCategoryService';
import ListProductsCategoryService from '@modules/products/services/ListProductsCategoryService';
import ListProductsCategoryByNameService from '@modules/products/services/ListProductsCategoryByNameService';
import UpdateProductsCategoryService from '@modules/products/services/UpdateProductsCategoryService';
import AppError from '@shared/errors/AppError';

export default class ProductsController {
  public async index(request: Request, response: Response): Promise<Response> {
    try {
      const listCategories = container.resolve(ListProductsCategoryService);

      const categories = await listCategories.execute();

      return response.json(categories);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { name, description } = request.body;

      const createProductCategory = container.resolve(
        CreateProductsCategoryService
      );

      const category = await createProductCategory.execute({
        name,
        description,
      });

      return response.json(category);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const { id, name, description } = request.body;

      const listCategoryByName = container.resolve(
        ListProductsCategoryByNameService
      );

      const categoryNameExists = await listCategoryByName.execute({ name });

      if (categoryNameExists) {
        throw new AppError('Category name already in use!', 400);
      }

      const update = container.resolve(UpdateProductsCategoryService);

      const updatedCategory = await update.execute({ id, name, description });

      return response.json(updatedCategory);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
