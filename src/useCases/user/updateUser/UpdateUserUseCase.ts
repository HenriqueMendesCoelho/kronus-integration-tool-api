import { User } from '../../../models/User';
import { IUserRepository } from '../../../repositories/IUserRepository';
import { UserNotAuthorizeError } from '../errors/UserNotAuthorizeError';
import { UserNotFoundError } from '../errors/UserNotFoudError';
import PasswordUtils from '../utils/PasswordUtils';

export class UpdateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(
    username: string,
    usernameUpdated: string,
    password: string,
    newPassword: string
  ): Promise<User> {
    const salt = PasswordUtils.generateSalt();
    const passwordHash = PasswordUtils.hashPassword(newPassword, salt);

    const userExits = await this.userRepository.findByUsername(username);

    if (!userExits) {
      throw new UserNotFoundError(username);
    }

    if (userExits.password !== password) {
      throw new UserNotAuthorizeError();
    }

    userExits.username = usernameUpdated || username;
    userExits.password = passwordHash || userExits.password;
    userExits.salt = password ? salt : userExits.salt;

    const updateUser = await this.userRepository.update(
      userExits.username,
      userExits
    );

    return updateUser;
  }
}
