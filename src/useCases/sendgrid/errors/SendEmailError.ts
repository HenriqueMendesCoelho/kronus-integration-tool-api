import { CustomError } from '../../../err/CustomError';

export class SendEmailError extends CustomError {
  statusCode = 500;

  constructor() {
    super('Error to send e-mail');
    Object.setPrototypeOf(this, SendEmailError.prototype);
  }
  serializeErrors() {
    return [
      {
        message: 'Error to send e-mail',
      },
    ];
  }
}
