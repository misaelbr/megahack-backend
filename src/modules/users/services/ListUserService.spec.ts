import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

import ListUserService from './ListUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeCacheProvider: FakeCacheProvider;
let listUsers: ListUserService;

interface userTest {
  name: string;
  email: string;
  password?: string;
}

describe('ListUsers', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listUsers = new ListUserService(fakeUsersRepository, fakeCacheProvider);
  });

  it('should be able to list users show the user profile', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      gender: 'male',
    });

    let obj1: userTest;
    obj1 = user1;
    delete obj1.password;
    Object.assign(obj1, { avatar_url: null });

    const user2 = await fakeUsersRepository.create({
      name: 'John Trê',
      email: 'johntre@example.com',
      password: '123456',
      gender: 'male',
    });

    let obj2: userTest;
    obj2 = user2;
    delete obj2.password;
    Object.assign(obj2, { avatar_url: null });

    const users = await listUsers.execute();

    expect(users).toEqual([obj1, obj2]);
  });

  it('should be able to return undefinid if not exist users', async () => {
    const users = await listUsers.execute();

    expect(users).toBe(null);
  });
});
