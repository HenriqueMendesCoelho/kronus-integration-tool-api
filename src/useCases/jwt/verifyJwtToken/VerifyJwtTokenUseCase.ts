import jwt from 'jsonwebtoken';
import { PayloadToken } from '../types/TypeTokenCustom';

export class VerifyJwtTokenUseCase {
  private secret = process.env.JWT_SECRET;

  isValid(token: string) {
    token = token.slice(7);

    try {
      const isValid = jwt.verify(token, this.secret) as PayloadToken;

      if (!isValid) {
        return false;
      }

      return Date.now() < isValid.exp;
    } catch {
      return false;
    }
  }

  getUsername(token: string) {
    token = token.slice(7);

    try {
      const isValid = jwt.verify(token, this.secret) as PayloadToken;
      console.log(isValid);
      console.log(isValid);
      console.log(isValid);
      return isValid.username;
    } catch {
      return '';
    }
  }
}
