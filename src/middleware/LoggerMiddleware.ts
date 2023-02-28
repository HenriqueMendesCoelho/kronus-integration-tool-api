import { NextFunction, Request, Response } from 'express';
import { toISOStringWithTimezone } from '../utils/DateUtils';

function logger(request: Request, response: Response, next: NextFunction) {
  const from = request.headers['x-forwarded-for'];
  response.on('finish', () => {
    console.log(
      `${toISOStringWithTimezone(new Date())}-[${response.statusCode}][${
        request.method
      }]${request.path}[from:${from}]`
    );
  });
  next();
}

export { logger };
