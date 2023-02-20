import jwt from 'jsonwebtoken';
import { PayloadToken } from '../types/TypeTokenCustom';

export class VerifyJwtTokenUseCase {
  private secret = process.env.JWT_SECRET;

  isValid(token: string) {
    token = token.slice(7);

    try {
      const isValid = jwt.verify(token, this.secret);
      return !!isValid;
    } catch {
      return false;
    }
  }

  getUsername(token: string) {
    token = token.slice(7);

    try {
      const isValid = jwt.verify(token, this.secret) as PayloadToken;
      return isValid.username;
    } catch {
      return false;
    }
  }
}
