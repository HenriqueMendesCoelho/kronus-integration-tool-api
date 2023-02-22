import Router from 'express';

import { apiKeyController } from './useCases/apiKey';
import { secure, secureApiKey } from './middleware/SecureEndpointMiddleware';
import { jwtController } from './useCases/jwt';
import { sendGridController } from './useCases/sendgrid';
import { userController } from './useCases/user';
import { tmdbController } from './useCases/tmdb';

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

router.post(
  `${basePathV1}/sendgrid/template`,
  secureApiKey,
  (request, response) => {
    return sendGridController.sendMailTemplate(request, response);
  }
);

router.put(`${basePathV1}/user`, secure, (request, response) => {
  return userController.update(request, response);
});

router.get(
  `${basePathV1}/movie/:id/summary`,
  secureApiKey,
  (request, response) => {
    return tmdbController.movieResume(request, response);
  }
);

export { router };
