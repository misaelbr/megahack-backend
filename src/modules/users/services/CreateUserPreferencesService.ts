import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import UserPreferences from '@modules/users/infra/typeorm/entities/UserPreferences';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUserPreferencesRepository from '../repositories/IUserPreferencesRepository';

interface IRequest {
  favorite_color: string;
  favorite_size: string;
  user_id: string;
  look_styles_id: string;
}

@injectable()
class CreateUserPreferencesService {
  constructor(
    @inject('UserPreferencesRepository')
    private userPreferencesRepository: IUserPreferencesRepository
  ) {}

  public async execute({
    favorite_color,
    favorite_size,
    user_id,
    look_styles_id,
  }: IRequest): Promise<UserPreferences> {
    let userPreferences = await this.userPreferencesRepository.findByUserId(
      user_id
    );

    if (userPreferences) {
      userPreferences.favorite_color = favorite_color;
      userPreferences.favorite_size = favorite_size;
      userPreferences.look_styles_id = look_styles_id;

      await this.userPreferencesRepository.save(userPreferences);

      return userPreferences;
    }

    const newUserPreferences = await this.userPreferencesRepository.create({
      favorite_color,
      favorite_size,
      user_id,
      look_styles_id,
    });

    await this.userPreferencesRepository.save(newUserPreferences);

    return newUserPreferences;
  }
}

export default CreateUserPreferencesService;
