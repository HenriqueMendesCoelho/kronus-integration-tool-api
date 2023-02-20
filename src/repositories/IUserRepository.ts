import { User } from '../models/User';

export interface IUserRepository {
  findByUsername(username: string): Promise<User>;
  findAll(): Promise<Array<User>>;
  save(user: User): Promise<User>;
  update(username: string, user: User): Promise<User>;
}
