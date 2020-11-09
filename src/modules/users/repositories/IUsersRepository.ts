import User from '../infra/typeorm/entities/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

export default interface IUsersRepository {
  findById(data: string): Promise<User | undefined>;
  findByEmail(data: string): Promise<User | undefined>;
  findAllUsers(): Promise<User[] | null>;
  create(data: ICreateUserDTO): Promise<User>;
  save(data: ICreateUserDTO): Promise<User>;
}
