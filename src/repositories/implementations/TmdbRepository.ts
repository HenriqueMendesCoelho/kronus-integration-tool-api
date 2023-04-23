import axios from 'axios';
import { TmdbIntegrationError } from '../../useCases/tmdb/errors/TmdbIntegrationError';
import { ITmdbRepository } from '../ITmdbRepository';

export class TmdbRepository implements ITmdbRepository {
  private tmdbUrl = process.env.TMDB_ORIGIN_V3;
  private tmdbKey = process.env.TMDB_API_KEY_V3;

  async callTmdb(
    url: string,
    method: string,
    body?: object,
    params?: object
  ): Promise<any> {
    try {
      const response = await axios({
        url,
        method,
        baseURL: this.tmdbUrl,
        data: this.bodyIsEmpty(body) ? undefined : body,
        params: {
          api_key: this.tmdbKey,
          ...params,
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
      this.errorDefaultThrow(error);
    }
  }

  private bodyIsEmpty(body: object) {
    if (!body) {
      return true;
    }

    return Object.keys(body).length === 0 && body.constructor === Object;
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
