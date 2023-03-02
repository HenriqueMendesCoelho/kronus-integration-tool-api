import { Request, Response } from 'express';
import { CustomError } from '../../err/CustomError';
import { TmdbIntegrationError } from './errors/TmdbIntegrationError';
import { SearchGenreUseCase } from './searchGenre/SearchGenreUseCase';
import { SearchMovieUseCase } from './searchMovie/SearchMovieUseCase';

export class TmdbController {
  constructor(
    private searchMovieUseCase: SearchMovieUseCase,
    private searchGenreUseCase: SearchGenreUseCase
  ) {}

  async seachMoviesByName(request: Request, response: Response) {
    if (!request.query.query) {
      return response.status(400).send({
        error: true,
        message: "'query' parameter cannot be empty",
      });
    }

    const query = request.query.query;
    const language = request.query.language || 'pt-Br';
    const page = parseInt(request.query.page?.toString()) || 1;
    const include_adult = request.query.include_adult || 'false';

    try {
      const movies = await this.searchMovieUseCase.seachMoviesByName({
        query: query?.toString(),
        language: language?.toLocaleString(),
        page,
        include_adult: include_adult?.toString(),
      });

      return response.status(200).json(movies).send();
    } catch (error) {
      if (error instanceof CustomError) {
        return response
          .status(error.statusCode)
          .send(...error.serializeErrors());
      }
      return response.status(500).send(error);
    }
  }

  async findMovieById(request: Request, response: Response) {
    const { id } = request.params;
    const idConverted = parseInt(id);
    const language = request.query.language || 'pt-Br';

    if (!idConverted) {
      return response.status(400).send({
        error: true,
        message: "'id' parameter cannot be empty",
      });
    }
    try {
      const movie = await this.searchMovieUseCase.findMovieById(
        idConverted,
        language?.toString()
      );

      if (!movie) {
        return response.status(204).send();
      }

      return response.status(200).json(movie).send();
    } catch (error) {
      if (error instanceof CustomError) {
        return response
          .status(error.statusCode)
          .send(...error.serializeErrors());
      }
      return response.status(500).send(error);
    }
  }

  async findMovieCreditsById(request: Request, response: Response) {
    const { id } = request.params;
    const idConverted = parseInt(id);
    const language = request.query.language || 'pt-Br';

    if (!idConverted) {
      return response.status(400).send({
        error: true,
        message: "'id' parameter cannot be empty",
      });
    }

    try {
      const credits = await this.searchMovieUseCase.findMovieCreditsById(
        idConverted,
        language?.toString()
      );

      if (!credits) {
        return response.status(204).send();
      }

      return response.status(200).json(credits).send();
    } catch (error) {
      if (error instanceof CustomError) {
        return response
          .status(error.statusCode)
          .send(...error.serializeErrors());
      }
      return response.status(500).send(error);
    }
  }

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

  async listGenres(request: Request, response: Response) {
    const language = request.query.language;
    try {
      const genres = await this.searchGenreUseCase.list(language?.toString());
      return response.status(200).json(genres).send();
    } catch (error) {
      if (error instanceof CustomError) {
        return response
          .status(error.statusCode)
          .send(...error.serializeErrors());
      }
      return response.status(500).send(error);
    }
  }
}
