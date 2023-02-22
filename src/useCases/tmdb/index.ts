import { TmdbRepository } from '../../repositories/implementations/TmdbRepository';
import { SearchMovieUseCase } from './searchMovie/SearchMovieUseCase';
import { TmdbController } from './TmdbController';

const tmdbRepository = new TmdbRepository();

const searchMoiveUseCase = new SearchMovieUseCase(tmdbRepository);

const tmdbController = new TmdbController(searchMoiveUseCase);

export { searchMoiveUseCase, tmdbController };
