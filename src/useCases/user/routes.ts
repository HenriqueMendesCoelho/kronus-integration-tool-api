import { Router } from 'express';
import { userController } from '.';
import { secure } from '../../middleware/SecureEndpointMiddleware';

const router = Router();
const basePathV1 = '/api/v1';

router.put(`${basePathV1}/user`, secure, (request, response) => {
  return userController.update(request, response);
});

export { router as userRouter };
