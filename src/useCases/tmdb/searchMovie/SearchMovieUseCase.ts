import { ILibreTranslateRepository } from '../../../repositories/ILibreTranslateRepository';
import { ITmdbRepository } from '../../../repositories/ITmdbRepository';
import { CreateSummaryError } from '../errors/CreateSummaryError';
import { MovieFoundById } from '../types/TypeMovies';
import Redis from 'ioredis';

export class SearchMovieUseCase {
  constructor(
    private tmdbRepository: ITmdbRepository,
    private libreTranslateRepository: ILibreTranslateRepository,
    private redisClient: Redis
  ) {}

  async summary(id: number) {
    try {
      const [moviePortuguese, movieEnglish]: [MovieFoundById, MovieFoundById] =
        await this.searchMovie(id);

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
        description: await this.getMovieOverview(moviePortuguese, movieEnglish),
        genres,
        release_date: moviePortuguese?.release_date,
        runtime: moviePortuguese?.runtime,
      };
    } catch (error) {
      throw new CreateSummaryError(error);
    }
  }

  private async searchMovie(
    id: number
  ): Promise<[MovieFoundById, MovieFoundById]> {
    const pathFindMovieById = `/movie/${id}`;
    return await Promise.all([
      this.tmdbRepository.callTmdb(pathFindMovieById, 'get', undefined, {
        language: 'pt-Br',
        append_to_response: 'videos,credits',
      }),
      this.tmdbRepository.callTmdb(pathFindMovieById, 'get', undefined, {
        language: 'en-Us',
        append_to_response: 'videos',
      }),
    ]);
  }

  private async getMovieOverview(
    moviePortuguese: MovieFoundById,
    movieEnglish: MovieFoundById
  ): Promise<string> {
    if (moviePortuguese.overview) {
      return moviePortuguese.overview;
    }
    const cacheKey = `movie:overview:${moviePortuguese.id}`;
    const cachedTranslation = await this.redisClient.get(cacheKey);
    if (cachedTranslation) {
      return cachedTranslation;
    }

    const translatedOverview = await this.libreTranslateRepository
      .translate(movieEnglish.overview)
      .catch((err) => {
        console.error('Error translating movie overview', err);
        return '';
      });

    const ex3days = 259200;
    await this.redisClient
      .set(cacheKey, translatedOverview, 'EX', ex3days)
      .catch((err) => {
        console.error('Error saving movie overview in redis', err);
      });

    return translatedOverview;
  }
}
