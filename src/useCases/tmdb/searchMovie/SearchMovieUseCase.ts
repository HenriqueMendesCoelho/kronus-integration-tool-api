import { ITmdbRepository } from '../../../repositories/ITmdbRepository';
import { CreateSummaryError } from '../errors/CreateSummaryError';

export class SearchMovieUseCase {
  constructor(private tmdbRepository: ITmdbRepository) {}

  async findMovieById(id: number, language: string) {
    const movie = await this.tmdbRepository.findMovieById(id, {
      language: language || 'pt-Br',
    });

    return movie;
  }

  async seachMoviesByName(params: {
    query: string;
    language?: string;
    page?: number;
    include_adult?: string;
  }) {
    const movies = await this.tmdbRepository.findMoviesByName({
      query: params.query,
      language: params.language || 'pt-Br',
      page: params.page || 1,
      include_adult: params.include_adult || 'false',
    });

    return movies;
  }

  async findMovieCreditsById(id: number, language: string) {
    const credits = await this.tmdbRepository.findMovieCreditsById(id, {
      language: language || 'pt-Br',
    });

    return credits;
  }

  async summary(id: number) {
    try {
      const moviePortuguese = await this.tmdbRepository.findMovieById(id, {});
      const movieEnglish = await this.tmdbRepository.findMovieById(id, {
        language: 'en-Us',
      });

      const movieCredits = await this.tmdbRepository.findMovieCreditsById(
        id,
        {}
      );
      const director = movieCredits.crew.filter((c) => c.job === 'Director');
      const directorNames = director.map((d) => d.name).join(', ');
      const genres = moviePortuguese.genres.map((g) => g.name).join(', ');

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
      };
    } catch (error) {
      throw new CreateSummaryError(error);
    }
  }
}
