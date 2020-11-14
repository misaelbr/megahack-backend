import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateProductImageService from '@modules/products/services/UpdateProductImageService';
import { classToClass } from 'class-transformer';

export default class ProductsImageController {
  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const { product_id: id } = request.body;
      const productFileName = request.file.filename;

      const updateProductImage = container.resolve(UpdateProductImageService);

      const product = await updateProductImage.execute({
        id,
        productFileName,
      });

      return response.json(classToClass(product));
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
