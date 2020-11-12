import { getRepository, Repository } from 'typeorm';

import IUserPreferencesRepository from '@modules/users/repositories/IUserPreferencesRepository';
import ICreateUserPreferencesDTO from '@modules/users/dtos/ICreateUserPreferencesDTO';

import UserPreferences from '../entities/UserPreferences';

class UserPreferencesRepository implements IUserPreferencesRepository {
  private ormRepository: Repository<UserPreferences>;

  constructor() {
    this.ormRepository = getRepository(UserPreferences);
  }

  public async create(
    dataUserPreferences: ICreateUserPreferencesDTO
  ): Promise<UserPreferences> {
    const userPreferences = this.ormRepository.create(dataUserPreferences);

    await this.ormRepository.save(userPreferences);

    return userPreferences;
  }

  public async save(
    dataUserPreferences: UserPreferences
  ): Promise<UserPreferences> {
    const userPreferences = await this.ormRepository.save(dataUserPreferences);

    return userPreferences;
  }

  public async findById(
    user_preferences_id: string
  ): Promise<UserPreferences | undefined> {
    const userPreferences = await this.ormRepository.findOne(
      user_preferences_id
    );

    return userPreferences;
  }

  public async findByUserId(
    user_id: string
  ): Promise<UserPreferences | undefined> {
    const userPreferences = await this.ormRepository.findOne({
      where: { user_id },
    });

    return userPreferences;
  }
}

export default UserPreferencesRepository;
