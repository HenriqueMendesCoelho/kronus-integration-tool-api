import { TmdbRepository } from '../../repositories/implementations/TmdbRepository';
import { MovieSummaryUseCase } from './movieSummary/MovieSummaryUseCase';
import { TmdbController } from './TmdbController';

const tmdbRepository = new TmdbRepository();

const movieSummaryUseCase = new MovieSummaryUseCase(tmdbRepository);

const tmdbController = new TmdbController(movieSummaryUseCase);

export { movieSummaryUseCase, tmdbController };
