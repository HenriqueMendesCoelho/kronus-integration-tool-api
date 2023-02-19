import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../err/CustomError';
import { ApiKeyRepository } from '../repositories/implementations/ApiKeyRepository';
import { verifyJwtTokenUseCase } from '../useCases/jwt';

async function secure(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const jwt = request.headers['authorization'];

  if (!jwt) {
    response.status(403).end();
    return;
  }

  const verify = verifyJwtTokenUseCase.verify(jwt);

  if (verify) {
    response.status(403).end();
    return;
  }

  next();
}

async function secureApiKey(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const apiKeyRepository = new ApiKeyRepository();

  const apikey = request.headers['authorization'];

  if (!apikey || apikey.slice(0, 9) !== 'Bearer Kb.') {
    response.status(403).end();
    return;
  }

  const apikeyExists = apiKeyRepository.findByKey(apikey);

  if (!apikeyExists) {
    response.status(403).end();
    return;
  }

  next();
}

export { secure, secureApiKey };
