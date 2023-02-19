import { IApiKeyRepository } from '../../../repositories/IApiKeyRepository';

export class DeleteApiKeyUseCase {
  constructor(private apiKeyRepository: IApiKeyRepository) {}

  async execute(key: string) {
    this.apiKeyRepository.delete(key);
    return;
  }
}
