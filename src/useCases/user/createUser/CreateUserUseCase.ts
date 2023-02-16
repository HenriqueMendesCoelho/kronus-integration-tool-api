import crypto from 'crypto';
import { User } from '../../../models/User';
import { IUserRepository } from '../../../repositories/IUserRepository';

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(username: string, password: string) {
    const salt = this.generateSalt();
    const passwordHash = this.hashPassword(password, salt);

    const user = new User({ username, password: passwordHash, salt });

    const createdUser = await this.userRepository.save(user);
    return createdUser;
  }

  private hashPassword(password: string, salt: string) {
    return crypto
      .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
      .toString(`hex`);
  }

  private generateSalt(size = 16): string {
    return crypto.randomBytes(size).toString('hex');
  }
}
