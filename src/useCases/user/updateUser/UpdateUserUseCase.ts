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
    const newPasswordHash = PasswordUtils.hashPassword(newPassword, salt);

    const userExits = await this.userRepository.findByUsername(username);

    if (!userExits) {
      throw new UserNotFoundError(username);
    }

    const currentPasswordHash = PasswordUtils.hashPassword(
      password,
      userExits.salt
    );
    const passwordMatch = this.passwordMatch(
      userExits.password,
      currentPasswordHash
    );
    if (!passwordMatch) {
      throw new UserNotAuthorizeError();
    }

    userExits.username = usernameUpdated || username;
    userExits.password = passwordMatch ? newPasswordHash : userExits.password;
    userExits.salt = passwordMatch ? salt : userExits.salt;

    const updateUser = await this.userRepository.update(
      userExits.username,
      userExits
    );

    return updateUser;
  }

  private passwordMatch(currentPass: string, currentPasswordInformed) {
    return currentPass === currentPasswordInformed;
  }
}
