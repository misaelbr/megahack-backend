import { Request, Response } from 'express';

import { container } from 'tsyringe';

import ListAllLookStylesService from '@modules/looks/services/ListAllLookStylesService';
import ListLookStylesByIdService from '@modules/looks/services/ListLookStylesByIdService';
import AppError from '@shared/errors/AppError';
import CreateLookStylesService from '@modules/looks/services/CreateLookStylesService';

export default class LookStylesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listLookStyles = container.resolve(ListAllLookStylesService);

    const lookStyles = await listLookStyles.execute();

    return response.json(lookStyles);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    try {
      const { look_styles_id } = request.params;

      const findLookStyles = container.resolve(ListLookStylesByIdService);

      const lookStyles = await findLookStyles.execute({ look_styles_id });

      if (!lookStyles) {
        throw new AppError('LookStyle id not found!', 404);
      }

      return response.json(lookStyles);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { name, description } = request.body;

      const createLookStyles = container.resolve(CreateLookStylesService);

      const lookStyles = await createLookStyles.execute({ name, description });

      return response.json(lookStyles);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
