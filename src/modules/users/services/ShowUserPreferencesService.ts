import { inject, injectable } from 'tsyringe';

import UserPreferences from '@modules/users/infra/typeorm/entities/UserPreferences';
import IUserPreferencesRepository from '../repositories/IUserPreferencesRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
}

@injectable()
class ShowUserPreferencesService {
  constructor(
    @inject('UserPreferencesRepository')
    private userPreferencesRepository: IUserPreferencesRepository
  ) {}

  public async execute({ user_id }: IRequest): Promise<UserPreferences> {
    const userPreferences = await this.userPreferencesRepository.findByUserId(
      user_id
    );

    if (!userPreferences) {
      throw new AppError('User preferences not found!', 404);
    }

    return userPreferences;
  }
}

export default ShowUserPreferencesService;
