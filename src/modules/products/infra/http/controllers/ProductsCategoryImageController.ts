import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateProductsCategoryImageService from '@modules/products/services/UpdateProductsCategoryImageService';
import { classToClass } from 'class-transformer';

export default class ProductsImageController {
  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const { category_id: id } = request.body;
      const categoryFileName = request.file.filename;

      const updateProductImage = container.resolve(
        UpdateProductsCategoryImageService
      );

      const product = await updateProductImage.execute({
        id,
        categoryFileName,
      });

      return response.json(classToClass(product));
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
