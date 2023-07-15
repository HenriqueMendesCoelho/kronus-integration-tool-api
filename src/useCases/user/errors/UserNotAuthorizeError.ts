import { CustomError } from '../../../err/CustomError';

export class UserNotAuthorizeError extends CustomError {
  statusCode = 403;
  constructor() {
    super('Not authorized');
    Object.setPrototypeOf(this, UserNotAuthorizeError.prototype);
  }
  serializeErrors() {
    return [
      {
        sucess: false,
        message: 'Not authorized',
        timestamp: Date.now(),
      },
    ];
  }
}
