import { Request, Response } from 'express';
import { MovieSummaryUseCase } from './movieSummary/MovieSummaryUseCase';

export class TmdbController {
  constructor(private movieSummaryUseCase: MovieSummaryUseCase) {}

  async movieResume(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const movieResume = await this.movieSummaryUseCase.execute(parseInt(id));
      if (!movieResume) {
        return response.status(204).send();
      }

      return response.status(200).json(movieResume).send();
    } catch (error) {
      return response.status(500).send(error);
    }
  }
}
