import UserPreferences from '../infra/typeorm/entities/UserPreferences';
import ICreateUserPreferencesDTO from '../dtos/ICreateUserPreferencesDTO';

export default interface IUserPrerencesRepository {
  create(
    dataUserPreferences: ICreateUserPreferencesDTO
  ): Promise<UserPreferences>;
  save(dataUserPreferences: UserPreferences): Promise<UserPreferences>;
  findById(user_preferences_id: string): Promise<UserPreferences | undefined>;
  findByUserId(user_id: string): Promise<UserPreferences | undefined>;
}
