import { CustomError } from '../../../err/CustomError';

export class TmdbIntegrationError extends CustomError {
  constructor(
    private msg = 'Error during tmdb integration',
    public statusCode = 500,
    private other?: object
  ) {
    super(msg);
    Object.setPrototypeOf(this, TmdbIntegrationError.prototype);
  }
  serializeErrors() {
    return [
      {
        sucess: false,
        message: `${this.msg}`,
        error: this.other,
        timestamp: Date.now(),
      },
    ];
  }
}
