import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import User from '@modules/users/infra/typeorm/entities/User';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';

@injectable()
class ListUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}

  public async execute(): Promise<User[] | null> {
    let users = await this.cacheProvider.recover<User[]>('users-list');

    if (!users) {
      users = await this.usersRepository.findAllUsers();
    }

    await this.cacheProvider.save('users-list', classToClass(users));

    if (users) {
      return classToClass(users);
    } else {
      return null;
    }
  }
}

export default ListUserService;
