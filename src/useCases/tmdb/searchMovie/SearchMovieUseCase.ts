import { ITmdbRepository } from '../../../repositories/ITmdbRepository';

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
    const moviePortuguese = await this.tmdbRepository.findMovieById(id, {});
    const movieEnglish = await this.tmdbRepository.findMovieById(id, {
      language: 'en-Us',
    });

    const movieCredits = await this.tmdbRepository.findMovieCreditsById(id, {});
    const director = movieCredits.crew.filter((c) => c.job === 'Director');
    const directorNames = director.map((d) => d.name).join(', ');

    const trailerPortuguese = moviePortuguese.videos.results.find(
      (v) => v.site === 'YouTube' && v.type === 'Trailer' && v.official
    );

    const trailerEnglish = movieEnglish.videos.results.find(
      (v) => v.site === 'YouTube' && v.type === 'Trailer' && v.official
    );

    return {
      tmdbId: id,
      portugueseTitle: moviePortuguese.title,
      englishTitle: movieEnglish.title,
      originalTitle: movieEnglish.original_title,
      director: directorNames,
      urlImagePortuguese: moviePortuguese.poster_path,
      urlImageEnglish: movieEnglish.poster_path,
      portugueseUrlTrailer: trailerPortuguese.key || '',
      englishUrlTrailer: trailerEnglish.key || '',
      description: moviePortuguese.overview,
      release_date: moviePortuguese.release_date,
    };
  }
}
