import { CustomError } from '../../../err/CustomError';

export class SendEmailError extends CustomError {
  statusCode = 500;

  constructor(private msg: string) {
    super(msg);
    Object.setPrototypeOf(this, SendEmailError.prototype);
  }
  serializeErrors() {
    return [
      {
        sucess: false,
        message: this.msg,
        timestamp: Date.now(),
      },
    ];
  }
}
