import axios from 'axios';
import {
  MovieCreditsFoundById,
  MovieFoundById,
  MovieFoundByName,
} from '../../useCases/tmdb/types/TypeMovies';
import { ITmdbRepository } from '../ITmdbRepository';

export class TmdbRepository implements ITmdbRepository {
  private tmdbUrl = process.env.TMDB_ORIGIN_V3;
  private tmdbKey = process.env.TMDB_API_KEY_V3;

  async findMoviesByName(params: {
    query: string;
    language?: string;
    page?: number;
    include_adult?: string;
  }): Promise<MovieFoundByName> {
    const paramsString = this.getStringParams({
      query: params.query,
      language: params.language || 'pt-Br',
      page: params.page || 1,
      include_adult: params.include_adult || 'false',
    });

    try {
      const movies = await axios.get(
        `${this.tmdbUrl}/search/movie?api_key=${this.tmdbKey}&${paramsString}`
      );
      return movies.data;
    } catch (error) {
      throw new Error(error);
    }
  }
  async findMovieById(
    id: number,
    params: {
      language?: string;
    }
  ): Promise<MovieFoundById> {
    params.language = params.language || 'pt-Br';
    const paramsString = this.getStringParams(params);

    const movie = await axios.get(
      `${this.tmdbUrl}/movie/${id}?api_key=${this.tmdbKey}&${paramsString}&append_to_response=videos`
    );
    return movie.data;
  }
  async findMovieCreditsById(
    id: number,
    params: {
      language?: string;
    }
  ): Promise<MovieCreditsFoundById> {
    params.language = params.language || 'pt-Br';
    const paramsString = this.getStringParams(params);

    const movieCredits = await axios.get(
      `${this.tmdbUrl}/movie/${id}/credits?api_key=${this.tmdbKey}&${paramsString}`
    );
    return movieCredits.data;
  }

  private getStringParams(params: any) {
    return new URLSearchParams(params).toString();
  }
}
