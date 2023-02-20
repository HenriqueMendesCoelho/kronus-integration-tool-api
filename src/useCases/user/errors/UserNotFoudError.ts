import { CustomError } from '../../../err/CustomError';

export class UserNotFoundError extends CustomError {
  statusCode = 401;
  constructor(private username: string) {
    super(`User not found ${username}`);
    Object.setPrototypeOf(this, UserNotFoundError.prototype);
  }
  serializeErrors() {
    return [
      {
        sucess: false,
        message: `User not found ${this.username}`,
        timestamp: Date.now(),
      },
    ];
  }
}
