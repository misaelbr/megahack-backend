import { Request, Response } from 'express';

import { container } from 'tsyringe';

import ListProductsByGenderService from '@modules/products/services/ListProductsByGenderService';
import AppError from '@shared/errors/AppError';

class ProductsByGenderController {
  public async index(request: Request, response: Response): Promise<Response> {
    try {
      const { gender } = request.params;

      const productsList = container.resolve(ListProductsByGenderService);

      const products = await productsList.execute({ gender });

      return response.json(products);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}

export default ProductsByGenderController;
