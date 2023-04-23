import { Request, Response } from 'express';
import { CustomError } from '../../err/CustomError';
import { SearchMovieUseCase } from './searchMovie/SearchMovieUseCase';
import { TmdbDirectCallUseCase } from './tmdbDirectCall/tmdbDirectCallUseCase';

export class TmdbController {
  constructor(
    private searchMovieUseCase: SearchMovieUseCase,
    private tmdbDirectCallUseCase: TmdbDirectCallUseCase
  ) {}

  async movieSummary(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const movieResume = await this.searchMovieUseCase.summary(parseInt(id));
      if (!movieResume) {
        return response.status(204).send();
      }

      return response.status(200).json(movieResume).send();
    } catch (error) {
      if (error instanceof CustomError) {
        return response
          .status(error.statusCode)
          .send(...error.serializeErrors());
      }
      return response.status(500).send(error);
    }
  }

  async callTmdb(request: Request, response: Response) {
    const urlPath = request.path;
    const method = request.method;
    const body = request.body || undefined;
    const queryParams = request.query || undefined;
    try {
      const responseTmdb = await this.tmdbDirectCallUseCase.call(
        urlPath,
        method,
        body,
        queryParams
      );
      return response.status(200).json(responseTmdb).send();
    } catch (error) {
      console.log(error);
      if (error instanceof CustomError) {
        return response
          .status(error.statusCode)
          .send(...error.serializeErrors());
      }
      return response.status(500).send(error);
    }
  }
}
