import {
  MovieCreditsFoundById,
  MovieFoundById,
  MovieFoundByName,
} from '../useCases/tmdb/types/TypeMovies';

export interface ITmdbRepository {
  findMoviesByName(params: {
    query: string;
    language?: string;
    page?: number;
    include_adult?: string;
  }): Promise<MovieFoundByName>;
  findMovieById(
    id: number,
    params: {
      language?: string;
    }
  ): Promise<MovieFoundById>;
  findMovieCreditsById(
    id: number,
    params: {
      language?: string;
    }
  ): Promise<MovieCreditsFoundById>;
}
