import axios from 'axios';
import { ILibreTranslateRepository } from '../ILibreTranslateRepository';

type LibreTranslateRequest = {
  q: string;
  source: string;
  target: string;
  format: string;
  alternatives?: number;
};

type LibreTranslateResponse = {
  alternatives: string[];
  detectedLanguage: { cofidence: string; language: string };
  translatedText: string;
};

export class LibreTranslateRepository implements ILibreTranslateRepository {
  private static readonly LIBRETRANSLATE_URL = process.env.LIBRETRANSLATE_URL;

  async translate(text: string): Promise<string> {
    const data: LibreTranslateRequest = {
      q: text,
      source: 'auto',
      target: 'pt',
      format: 'text',
    };

    try {
      const response: LibreTranslateResponse = (
        await axios.post(
          `${LibreTranslateRepository.LIBRETRANSLATE_URL}/translate`,
          data
        )
      ).data;

      if (!response) {
        return Promise.reject('Error during libretranslate integration');
      }

      return response.translatedText;
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  }
}
