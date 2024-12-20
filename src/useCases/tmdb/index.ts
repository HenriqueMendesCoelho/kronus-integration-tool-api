import Redis from 'ioredis';
import { LibreTranslateRepository } from '../../repositories/implementations/LibreTranslateRepository';
import { TmdbRepository } from '../../repositories/implementations/TmdbRepository';
import { SearchMovieUseCase } from './searchMovie/SearchMovieUseCase';
import { TmdbController } from './TmdbController';
import { TmdbDirectCallUseCase } from './tmdbDirectCall/TmdbDirectCallUseCase';

const redisClient = new Redis({
  port: Number(process.env.REDIS_PORT) || 6379,
  host: process.env.REDIS_HOST,
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
});

const tmdbRepository = new TmdbRepository();
const libreTranslateRepository = new LibreTranslateRepository();

const searchMovieUseCase = new SearchMovieUseCase(
  tmdbRepository,
  libreTranslateRepository,
  redisClient
);
const tmdbDirectCallUseCase = new TmdbDirectCallUseCase(tmdbRepository);

const tmdbController = new TmdbController(
  searchMovieUseCase,
  tmdbDirectCallUseCase
);

export { searchMovieUseCase, tmdbController, tmdbDirectCallUseCase };
