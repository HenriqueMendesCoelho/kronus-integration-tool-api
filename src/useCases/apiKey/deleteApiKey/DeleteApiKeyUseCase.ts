import { IApiKeyRepository } from '../../../repositories/IApiKeyRepository';

export class DeleteApiKeyUseCase {
  constructor(private apiKeyRepository: IApiKeyRepository) {}

  async execute(name: string) {
    try {
      this.apiKeyRepository.delete(name);
    } catch (error) {
      console.log(error);
    } finally {
      return;
    }
  }
}
