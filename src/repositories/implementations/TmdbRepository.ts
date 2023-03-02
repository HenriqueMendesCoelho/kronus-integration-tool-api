import axios from 'axios';
import { TmdbIntegrationError } from '../../useCases/tmdb/errors/TmdbIntegrationError';
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
    language: 'pt-Br';
    page: 1;
    include_adult: 'false';
  }): Promise<MovieFoundByName> {
    const paramsString = this.getStringParams(params);
    try {
      const movies = await axios.get(
        `${this.tmdbUrl}/search/movie?api_key=${this.tmdbKey}&${paramsString}`
      );
      return movies.data;
    } catch (error) {
      this.errorDefaultThrow(error);
    }
  }
  async findMovieById(
    id: number,
    params: {
      language: 'pt-Br';
    }
  ): Promise<MovieFoundById> {
    const paramsString = this.getStringParams(params);
    try {
      const movie = await axios.get(
        `${this.tmdbUrl}/movie/${id}?api_key=${this.tmdbKey}&${paramsString}&append_to_response=videos`
      );
      return movie.data;
    } catch (error) {
      this.errorDefaultThrow(error);
    }
  }

  async findMovieCreditsById(
    id: number,
    params: {
      language: 'pt-Br';
    }
  ): Promise<MovieCreditsFoundById> {
    const paramsString = this.getStringParams(params);
    try {
      const movieCredits = await axios.get(
        `${this.tmdbUrl}/movie/${id}/credits?api_key=${this.tmdbKey}&${paramsString}`
      );
      return movieCredits.data;
    } catch (error) {
      this.errorDefaultThrow(error);
    }
  }

  private getStringParams(params: any) {
    return new URLSearchParams(params).toString();
  }

  private errorDefaultThrow(error: any) {
    const response = error.response;
    const isObject = typeof response == 'object';
    if (isObject) {
      throw new TmdbIntegrationError(
        undefined,
        response.status,
        isObject ? response.data : {}
      );
    }
    throw new TmdbIntegrationError(undefined, error.response.status, {
      message: 'Error during tmdb integration',
    });
  }
}
