import jwt from 'jsonwebtoken';

export class VerifyJwtTokenUseCase {
  private secret = process.env.JWT_SECRET;

  verify(token: string) {
    const tk = jwt.verify(token, this.secret);

    return !!tk;
  }
}
