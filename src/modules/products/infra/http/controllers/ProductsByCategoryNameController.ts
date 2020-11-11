import { Request, Response } from 'express';

import { container } from 'tsyringe';

import ListProductsCategoryByNameService from '@modules/products/services/ListProductsCategoryByNameService';
import ListProductsByCategoryIdService from '@modules/products/services/ListProductsByCategoryIdService';
import AppError from '@shared/errors/AppError';

class ProductsByCategoryNameController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { category_name: name } = request.params;

    const categories = container.resolve(ListProductsCategoryByNameService);

    const findCategory = await categories.execute({ name });

    if (!findCategory) {
      throw new AppError('Category invalid', 400);
    }

    const listProducts = container.resolve(ListProductsByCategoryIdService);

    const category_id = findCategory.id;
    const products = await listProducts.execute({ category_id });

    return response.json(products);
  }
}

export default ProductsByCategoryNameController;
