import {
  MovieCreditsFoundById,
  MovieFoundById,
  MovieFoundByName,
} from '../useCases/tmdb/types/TypeMovies';

export interface ITmdbRepository {
  findMovieByName(params: {
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
  findMovieByIdCredits(
    id: number,
    params: {
      language?: string;
    }
  ): Promise<MovieCreditsFoundById>;
}
