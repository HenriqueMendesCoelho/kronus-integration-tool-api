import { Router } from 'express';
import { jwtController } from '.';

const router = Router();

router.post('/login', (request, response) => {
  return jwtController.create(request, response);
});

export { router as jwtRouter };
