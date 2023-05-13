import { CustomError } from '../../../err/CustomError';

export class CreateSummaryError extends CustomError {
  statusCode = 500;
  constructor(private msg: string) {
    super(msg);
    Object.setPrototypeOf(this, CreateSummaryError.prototype);
  }
  serializeErrors() {
    return [
      {
        sucess: false,
        message: `${this.msg}`,
        timestamp: Date.now(),
      },
    ];
  }
}
