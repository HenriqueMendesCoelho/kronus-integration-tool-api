import { Request, Response } from 'express';
import { SearchMovieUseCase } from './searchMovie/SearchMovieUseCase';

export class TmdbController {
  constructor(private searchMovieUseCase: SearchMovieUseCase) {}

  async movieResume(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const movieResume = await this.searchMovieUseCase.summary(parseInt(id));
      if (!movieResume) {
        return response.status(204).send();
      }

      return response.status(200).json(movieResume).send();
    } catch (error) {
      return response.status(500).send(error);
    }
  }
}
