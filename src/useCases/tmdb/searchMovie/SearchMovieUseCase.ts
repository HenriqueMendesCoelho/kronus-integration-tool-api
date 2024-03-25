import { ITmdbRepository } from '../../../repositories/ITmdbRepository';
import { CreateSummaryError } from '../errors/CreateSummaryError';
import { MovieCreditsFoundById, MovieFoundById } from '../types/TypeMovies';

export class SearchMovieUseCase {
  constructor(private tmdbRepository: ITmdbRepository) {}

  async summary(id: number) {
    const pathFindMovieById = `/movie/${id}`;

    try {
      const moviePortuguese = (await this.tmdbRepository.callTmdb(
        pathFindMovieById,
        'get',
        undefined,
        {
          language: 'pt-Br',
          append_to_response: 'videos,credits',
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

      if (!moviePortuguese || !movieEnglish) {
        return {};
      }

      const director = moviePortuguese.credits.crew.filter(
        (c) => c.job === 'Director'
      );
      const directorNames = director.map((d) => d.name).join(', ');
      const genres = moviePortuguese.genres.map((g) => g.name);

      const trailerPortuguese =
        moviePortuguese.videos.results.find(
          (v) => v.site === 'YouTube' && v.type === 'Trailer' && v.official
        ) ||
        moviePortuguese.videos.results.find(
          (v) => v.site === 'YouTube' && v.type === 'Trailer'
        );

      const trailerEnglish =
        movieEnglish.videos.results.find(
          (v) => v.site === 'YouTube' && v.type === 'Trailer' && v.official
        ) ||
        movieEnglish.videos.results.find(
          (v) => v.site === 'YouTube' && v.type === 'Trailer'
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
