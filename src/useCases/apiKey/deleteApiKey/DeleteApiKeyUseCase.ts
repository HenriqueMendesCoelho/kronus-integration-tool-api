import { IApiKeyRepository } from '../../../repositories/IApiKeyRepository';

export class DeleteApiKeyUseCase {
  constructor(private apiKeyRepository: IApiKeyRepository) {}

  async execute(name: string) {
    this.apiKeyRepository.delete(name);
    return;
  }
}
