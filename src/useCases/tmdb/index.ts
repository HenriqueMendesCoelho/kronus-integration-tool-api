import { TmdbRepository } from '../../repositories/implementations/TmdbRepository';
import { SearchMovieUseCase } from './searchMovie/SearchMovieUseCase';
import { TmdbController } from './TmdbController';
import { TmdbDirectCallUseCase } from './tmdbDirectCall/tmdbDirectCallUseCase';

const tmdbRepository = new TmdbRepository();

const searchMovieUseCase = new SearchMovieUseCase(tmdbRepository);
const tmdbDirectCallUseCase = new TmdbDirectCallUseCase(tmdbRepository);

const tmdbController = new TmdbController(
  searchMovieUseCase,
  tmdbDirectCallUseCase
);

export { searchMovieUseCase, tmdbController, tmdbDirectCallUseCase };
