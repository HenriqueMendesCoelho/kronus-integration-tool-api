import { User } from '../../../models/User';
import { IUserRepository } from '../../../repositories/IUserRepository';
import PasswordUtils from '../utils/PasswordUtils';

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(username: string, password: string) {
    const salt = PasswordUtils.generateSalt();
    const passwordHash = PasswordUtils.hashPassword(password, salt);

    const user = new User({ username, password: passwordHash, salt });

    const createdUser = await this.userRepository.save(user);
    return createdUser;
  }
}
