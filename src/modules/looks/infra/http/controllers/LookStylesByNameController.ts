import { Request, Response } from 'express';

import { container } from 'tsyringe';

import ListLookStylesByNameService from '@modules/looks/services/ListLookStylesByNameService';
import AppError from '@shared/errors/AppError';

export default class LookStylesByNameController {
  public async show(request: Request, response: Response): Promise<Response> {
    try {
      const { name } = request.params;

      const findLookStyles = container.resolve(ListLookStylesByNameService);

      const lookStyles = await findLookStyles.execute({ name });
      return response.json(lookStyles);

      if (!lookStyles) {
        throw new AppError('LookStyle name not found!', 404);
      }
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
