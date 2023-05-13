import { ITmdbRepository } from '../../../repositories/ITmdbRepository';
import { CreateSummaryError } from '../errors/CreateSummaryError';
import { MovieCreditsFoundById, MovieFoundById } from '../types/TypeMovies';

export class SearchMovieUseCase {
  constructor(private tmdbRepository: ITmdbRepository) {}

  async summary(id: number) {
    const pathFindMovieById = `/movie/${id}`;

    const moviePortuguese = (await this.tmdbRepository.callTmdb(
      pathFindMovieById,
      'get',
      undefined,
      {
        language: 'pt-Br',
        append_to_response: 'videos',
      }
    )) as MovieFoundById;
    const movieEnglish = (await this.tmdbRepository.callTmdb(
      pathFindMovieById,
      'get',
      undefined,
      {
        language: 'en-Us',
        append_to_response: 'videos',
      }
    )) as MovieFoundById;
    const movieCredits = (await this.tmdbRepository.callTmdb(
      `/movie/${id}/credits`,
      'get',
      undefined,
      {
        language: 'en-Us',
        append_to_response: 'videos',
      }
    )) as MovieCreditsFoundById;

    if (!moviePortuguese || !movieEnglish || !movieCredits) {
      return {};
    }

    try {
      const director = movieCredits.crew.filter((c) => c.job === 'Director');
      const directorNames = director.map((d) => d.name).join(', ');
      const genres = moviePortuguese.genres.map((g) => g.name);

      const trailerPortuguese = moviePortuguese.videos.results.find(
        (v) => v.site === 'YouTube' && v.type === 'Trailer' && v.official
      );

      const trailerEnglish = movieEnglish.videos.results.find(
        (v) => v.site === 'YouTube' && v.type === 'Trailer' && v.official
      );

      return {
        tmdb_id: id,
        imdb_id: moviePortuguese?.imdb_id,
        portuguese_title: moviePortuguese?.title,
        english_title: movieEnglish?.title,
        original_title: movieEnglish?.original_title,
        director: directorNames,
        url_image_portuguese: moviePortuguese?.poster_path,
        url_image_english: movieEnglish?.poster_path,
        portuguese_url_trailer: trailerPortuguese?.key || '',
        english_url_trailer: trailerEnglish?.key || '',
        description: moviePortuguese?.overview,
        genres,
        release_date: moviePortuguese?.release_date,
        runtime: moviePortuguese?.runtime,
      };
    } catch (error) {
      throw new CreateSummaryError(error);
    }
  }
}
