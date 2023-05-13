import { CustomError } from '../../../err/CustomError';

export class SendEmailError extends CustomError {
  constructor(private msg: string, public statusCode = 500) {
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
