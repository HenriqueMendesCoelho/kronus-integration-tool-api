import { CustomError } from '../../../err/CustomError';

export class InvalidTokenError extends CustomError {
  statusCode = 403;

  constructor() {
    super('Invalid token');
    Object.setPrototypeOf(this, InvalidTokenError.prototype);
  }
  serializeErrors() {
    return [
      {
        sucess: false,
        message: 'Invalid token',
        timestamp: Date.now(),
      },
    ];
  }
}
