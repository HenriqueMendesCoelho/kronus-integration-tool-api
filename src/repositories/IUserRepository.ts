import { User } from '../models/User';

export interface IUserRepository {
  findByUsername(key: string): Promise<User>;
  save(user: User): Promise<User>;
}
