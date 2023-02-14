import crypto from 'crypto';
import { ApiKey } from '../../models/ApiKey';
import { IApiKeyRepository } from '../../repositories/IApiKeyRepository';

export class CreateApiKeyUseCase {
  constructor(private apiKeyRepository: IApiKeyRepository) {}

  async execute(): Promise<ApiKey> {
    let apiKey: string;

    do {
      apiKey = this.generateKey();
    } while (!(await this.apiKeyRepository.findByKey(apiKey)));

    const apiKeyCreated = new ApiKey(apiKey);
    await this.apiKeyRepository.save(apiKeyCreated);

    return apiKeyCreated;
  }

  generateKey(size = 100) {
    return `Kb.${crypto.randomBytes(size).toString('base64').slice(0, size)}`;
  }
}
