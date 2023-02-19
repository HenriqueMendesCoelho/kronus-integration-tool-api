import Router from 'express';

import { apiKeyController } from './useCases/apiKey';
import { secure } from './middleware/SecureEndpointMiddleware';
import { jwtController } from './useCases/jwt';

const router = Router();
const basePathV1 = '/api/v1';

router.post('/login', (request, response) => {
  return jwtController.create(request, response);
});

router.get(`${basePathV1}/key`, secure, (request, response) => {
  return apiKeyController.findAll(request, response);
});

router.post(`${basePathV1}/key`, secure, (request, response) => {
  return apiKeyController.createKey(request, response);
});

router.delete(`${basePathV1}/key`, secure, (request, response) => {
  return apiKeyController.delete(request, response);
});

export { router };
