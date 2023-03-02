import { ITmdbRepository } from '../../../repositories/ITmdbRepository';

export class SearchGenreUseCase {
  constructor(private repository: ITmdbRepository) {}

  async list(language = 'pt-Br') {
    const genres = await this.repository.listGenres(language);
    return genres;
  }
}
