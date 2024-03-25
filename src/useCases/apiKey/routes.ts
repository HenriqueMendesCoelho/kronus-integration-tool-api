import { Router } from 'express';
import { apiKeyController } from '.';
import { secure } from '../../middleware/SecureEndpointMiddleware';

const router = Router();
const basePathV1 = '/api/v1';

router.get(`${basePathV1}/key`, secure, (request, response) => {
  return apiKeyController.findAll(request, response);
});

router.post(`${basePathV1}/key`, secure, (request, response) => {
  return apiKeyController.createKey(request, response);
});

router.delete(`${basePathV1}/key/:name/delete`, secure, (request, response) => {
  return apiKeyController.delete(request, response);
});

export { router as apiKeyRouter };
