import { ITmdbRepository } from '../../../repositories/ITmdbRepository';

export class MovieSummaryUseCase {
  constructor(private tmdbRepository: ITmdbRepository) {}

  async execute(id: number) {
    const moviePortuguese = await this.tmdbRepository.findMovieById(id, {});
    const movieEnglish = await this.tmdbRepository.findMovieById(id, {
      language: 'en-Us',
    });

    const movieCredits = await this.tmdbRepository.findMovieByIdCredits(id, {});
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
