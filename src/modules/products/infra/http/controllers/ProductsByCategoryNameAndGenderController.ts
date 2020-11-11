import { Request, Response } from 'express';

import { container } from 'tsyringe';

import ListProductsCategoryByNameService from '@modules/products/services/ListProductsCategoryByNameService';
import ListProductsByCategoryIdAndGenderService from '@modules/products/services/ListProductsByCategoryIdAndGenderService';
import AppError from '@shared/errors/AppError';

class ProductsByCategoryNameAndGenderController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { category_name: name, gender } = request.params;

    const categories = container.resolve(ListProductsCategoryByNameService);

    const findCategory = await categories.execute({ name });

    if (!findCategory) {
      throw new AppError('Category invalid', 400);
    }

    const listProducts = container.resolve(
      ListProductsByCategoryIdAndGenderService
    );

    const category_id = findCategory.id;
    const products = await listProducts.execute({ category_id, gender });
    return response.json(products);
  }
}

export default ProductsByCategoryNameAndGenderController;
