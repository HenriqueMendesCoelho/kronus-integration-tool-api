import { TmdbRepository } from '../../repositories/implementations/TmdbRepository';
import { SearchGenreUseCase } from './searchGenre/SearchGenreUseCase';
import { SearchMovieUseCase } from './searchMovie/SearchMovieUseCase';
import { TmdbController } from './TmdbController';

const tmdbRepository = new TmdbRepository();

const searchMoiveUseCase = new SearchMovieUseCase(tmdbRepository);
const searchGenresUseCase = new SearchGenreUseCase(tmdbRepository);

const tmdbController = new TmdbController(
  searchMoiveUseCase,
  searchGenresUseCase
);

export { searchMoiveUseCase, searchGenresUseCase, tmdbController };
