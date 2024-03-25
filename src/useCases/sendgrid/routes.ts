import { Router } from 'express';
import { secureApiKey } from '../../middleware/SecureEndpointMiddleware';
import { sendGridController } from '.';

const router = Router();
const basePathV1 = '/api/v1';

router.post(
  `${basePathV1}/sendgrid/template`,
  secureApiKey,
  (request, response) => {
    return sendGridController.sendMailTemplate(request, response);
  }
);

export { router as sendgridRouter };
