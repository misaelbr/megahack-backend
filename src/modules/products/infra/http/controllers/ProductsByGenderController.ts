import { Request, Response } from 'express';

import { container } from 'tsyringe';

import ListProductsByGenderService from '@modules/products/services/ListProductsByGenderService';
import AppError from '@shared/errors/AppError';

class ProductsByGenderController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { gender } = request.params;

    const productsList = container.resolve(ListProductsByGenderService);

    const products = await productsList.execute({ gender });

    return response.json(products);
  }
}

export default ProductsByGenderController;
