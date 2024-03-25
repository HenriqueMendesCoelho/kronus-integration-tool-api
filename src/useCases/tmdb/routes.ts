import { Router } from 'express';
import { tmdbController } from '.';
import { secureApiKey } from '../../middleware/SecureEndpointMiddleware';

const router = Router();
const basePathV1 = '/api/v1';

router.get(
  `${basePathV1}/tmdb/movie/:id/summary`,
  secureApiKey,
  (request, response) => {
    return tmdbController.movieSummary(request, response);
  }
);

router.get(
  new RegExp(`^${basePathV1}/tmdb/.+$`),
  secureApiKey,
  (request, response) => {
    return tmdbController.callTmdb(request, response);
  }
);

export { router as tmdbRouter };
