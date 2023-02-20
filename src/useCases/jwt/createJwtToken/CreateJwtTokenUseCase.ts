import jwt from 'jsonwebtoken';
import { IUserRepository } from '../../../repositories/IUserRepository';
import PasswordUtils from '../../user/utils/PasswordUtils';
import { InvalidCredencialsError } from '../errors/InvalidCredencialsError';

export class CreateJwtTokenUseCase {
  constructor(private userRepository: IUserRepository) {}

  private secret = process.env.JWT_SECRET;

  async create(username: string, password: string): Promise<object> {
    const user = await this.userRepository.findByUsername(username);
    const exp = Math.floor(Date.now() / 1000) + 60 * 60;

    if (!user) {
      throw new InvalidCredencialsError();
    }

    const validatePass = PasswordUtils.validPassword(
      password,
      user.password,
      user.salt
    );

    if (!validatePass) {
      throw new InvalidCredencialsError();
    }

    const tk = jwt.sign(
      {
        exp,
        issuer: 'Kronus Integration tool app',
        audience: 'Kronus Integration tool user',
        username,
      },
      this.secret
    );

    return {
      access_token: tk,
      exp,
    };
  }
}
