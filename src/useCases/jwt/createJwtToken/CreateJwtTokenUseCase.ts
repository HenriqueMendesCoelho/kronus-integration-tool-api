import jwt from 'jsonwebtoken';
import { IUserRepository } from '../../../repositories/IUserRepository';
import PasswordUtils from '../../user/utils/PasswordUtils';
import { InvalidCredencialsError } from '../errors/InvalidCredencialsError';

export class CreateJwtTokenUseCase {
  constructor(private userRepository: IUserRepository) {}

  private secret = process.env.JWT_SECRET;

  async create(username: string, password: string): Promise<object> {
    const user = await this.userRepository.findByUsername(username);
    const exp = new Date();
    exp.setHours(exp.getHours() + 1);
    const expires = this.toISOStringWithTimezone(exp);

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

    const token = jwt.sign(
      {
        exp: exp.getTime(),
        issuer: 'Kronus Integration tool app',
        audience: 'Kronus Integration tool user',
        username,
      },
      this.secret
    );

    return {
      access_token: token,
      expires,
    };
  }

  private toISOStringWithTimezone = (date: Date) => {
    const tzOffset = -date.getTimezoneOffset();
    const diff = tzOffset >= 0 ? '+' : '-';
    const pad = (n) => `${Math.floor(Math.abs(n))}`.padStart(2, '0');
    return (
      date.getFullYear() +
      '-' +
      pad(date.getMonth() + 1) +
      '-' +
      pad(date.getDate()) +
      'T' +
      pad(date.getHours()) +
      ':' +
      pad(date.getMinutes()) +
      ':' +
      pad(date.getSeconds()) +
      diff +
      pad(tzOffset / 60) +
      ':' +
      pad(tzOffset % 60)
    );
  };
}
