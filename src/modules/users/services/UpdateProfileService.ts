import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';

import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  old_password?: string;
  password?: string;
  gender: 'male' | 'female';
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}

  public async execute({
    user_id,
    name,
    email,
    old_password,
    password,
    gender,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User id not found!');
    }

    const userWhitUpdatedEmail = await this.usersRepository.findByEmail(email);

    if (userWhitUpdatedEmail && userWhitUpdatedEmail.id !== user_id) {
      throw new AppError('E-mail already in use.');
    }
    user.name = name;
    user.email = email;
    user.gender = gender;

    if (password && !old_password) {
      throw new AppError(
        'You neeed to inform the old password to set a new password.'
      );
    }

    if (password && old_password) {
      const checkOldPassword = await this.hashProvider.compareHash(
        old_password,
        user.password
      );

      if (!checkOldPassword) {
        throw new AppError('Old password does no match!');
      }
      user.password = await this.hashProvider.generateHash(password);
    }

    this.cacheProvider.invalidate('users-list');

    return this.usersRepository.save(user);
  }
}

export default UpdateProfileService;
