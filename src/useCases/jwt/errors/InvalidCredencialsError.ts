import { CustomError } from '../../../err/CustomError';

export class InvalidCredencialsError extends CustomError {
  statusCode = 401;

  constructor() {
    super('Invalid Credencials');
    Object.setPrototypeOf(this, InvalidCredencialsError.prototype);
  }
  serializeErrors() {
    return [
      {
        message: 'Invalid Credencials',
      },
    ];
  }
}
