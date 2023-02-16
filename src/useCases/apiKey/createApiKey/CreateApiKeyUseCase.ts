import crypto from 'crypto';
import { ApiKey } from '../../../models/ApiKey';
import { IApiKeyRepository } from '../../../repositories/IApiKeyRepository';

export class CreateApiKeyUseCase {
  constructor(private apiKeyRepository: IApiKeyRepository) {}

  async execute(name: string): Promise<ApiKey> {
    let key: string;
    let validateIfKeyAlreadyExistis: ApiKey;
    do {
      key = this.generateKey();
      validateIfKeyAlreadyExistis = await this.apiKeyRepository.findByKey(key);
    } while (!!validateIfKeyAlreadyExistis);

    const apiKeyCreated = new ApiKey({ key, name });
    await this.apiKeyRepository.save(apiKeyCreated);

    return apiKeyCreated;
  }

  private generateKey(size = 100) {
    return `Kb.${crypto.randomBytes(size).toString('base64').slice(0, size)}`;
  }
}
