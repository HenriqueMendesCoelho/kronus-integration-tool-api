import { ApiKey } from '../../../models/ApiKey';
import { IApiKeyRepository } from '../../../repositories/IApiKeyRepository';

export class SearchApiKey {
  constructor(private apiKeyRepository: IApiKeyRepository) {}

  async findByKey(key: string): Promise<ApiKey | null> {
    const apikey = await this.apiKeyRepository.findByKey(key);

    if (!apikey) {
      return null;
    }

    return apikey;
  }

  async findAll(): Promise<Array<ApiKey> | []> {
    const listApiKey = await this.apiKeyRepository.findAll();

    if (!listApiKey) {
      return [];
    }

    return listApiKey;
  }
}
