import { Request, Response } from 'express';

import { container } from 'tsyringe';

import ListLookStylesByNameService from '@modules/looks/services/ListLookStylesByNameService';
import AppError from '@shared/errors/AppError';

export default class LookStylesByNameController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { name } = request.params;

    const findLookStyles = container.resolve(ListLookStylesByNameService);

    const lookStyles = await findLookStyles.execute({ name });

    if (!lookStyles) {
      throw new AppError('LookStylename not found!', 404);
    }

    return response.json(lookStyles);
  }
}
