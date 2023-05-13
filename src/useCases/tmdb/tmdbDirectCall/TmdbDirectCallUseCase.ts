import { ITmdbRepository } from '../../../repositories/ITmdbRepository';

export class TmdbDirectCallUseCase {
  constructor(private repository: ITmdbRepository) {}

  async call(url: string, method: string, body?: object, params?: object) {
    const pathTmdb = url.replace('/api/v1/tmdb', '');
    const response = await this.repository.callTmdb(
      pathTmdb,
      method,
      body,
      params
    );

    return response;
  }
}
