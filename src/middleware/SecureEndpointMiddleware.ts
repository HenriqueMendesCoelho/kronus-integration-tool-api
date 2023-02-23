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

  const verify = verifyJwtTokenUseCase.isValid(jwt);

  if (!verify) {
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

  const headerAuthorization = request.headers['authorization'];
  const apikey = headerAuthorization.slice(7);
  const startsWithKb = apikey.slice(0, 3) === 'Kb.';

  if (!apikey || !startsWithKb) {
    response.status(403).end();
    return;
  }

  const apikeyExists = await apiKeyRepository.findByKey(apikey);

  if (!apikeyExists) {
    response.status(403).end();
    return;
  }

  next();
}

export { secure, secureApiKey };
