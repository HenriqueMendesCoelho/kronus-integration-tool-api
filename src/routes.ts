import Router from 'express';

import { userRouter } from './useCases/user/routes';
import { jwtRouter } from './useCases/jwt/routes';
import { tmdbRouter } from './useCases/tmdb/routes';
import { sendgridRouter } from './useCases/sendgrid/routes';
import { apiKeyRouter } from './useCases/apiKey/routes';

const router = Router();

router.use(userRouter);
router.use(jwtRouter);
router.use(tmdbRouter);
router.use(sendgridRouter);
router.use(apiKeyRouter);

export { router };
