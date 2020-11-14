import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateUserPreferencesService from '@modules/users/services/UpdateUserPreferencesService';
import ShowUserPreferencesService from '@modules/users/services/ShowUserPreferencesService';
import CreateUserPreferencesService from '@modules/users/services/CreateUserPreferencesService';

export default class UserPreferencesController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const user_id = request.user.id;
      const { favorite_color, favorite_size, look_styles_id } = request.body;

      const createUserPreferences = container.resolve(
        CreateUserPreferencesService
      );

      const userPreferences = await createUserPreferences.execute({
        favorite_color,
        favorite_size,
        look_styles_id,
        user_id,
      });

      return response.json(userPreferences);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async show(request: Request, response: Response): Promise<Response> {
    try {
      const user_id = request.user.id;

      const showUserPreferences = container.resolve(ShowUserPreferencesService);

      const userPreferences = await showUserPreferences.execute({ user_id });

      return response.json(userPreferences);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const user_id = request.user.id;
      const { favorite_color, favorite_size, look_styles_id } = request.body;

      const updateUserPreferences = container.resolve(
        UpdateUserPreferencesService
      );
      const userPreferences = await updateUserPreferences.execute({
        favorite_color,
        favorite_size,
        look_styles_id,
        user_id,
      });

      return response.json(userPreferences);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
