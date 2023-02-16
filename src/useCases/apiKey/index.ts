import { ApiKeyRepository } from '../../repositories/implementations/ApiKeyRepository';
import { ApiKeyController } from './ApiKeyController';
import { CreateApiKeyUseCase } from './createApiKey/CreateApiKeyUseCase';
import { SearchApiKey } from './searchApiKey/SearchApiKey';

const apiKeyRepository = new ApiKeyRepository();

const createApiKeyUseCase = new CreateApiKeyUseCase(apiKeyRepository);
const searchApiKey = new SearchApiKey(apiKeyRepository);

const apiKeyController = new ApiKeyController(
  createApiKeyUseCase,
  searchApiKey
);

export { createApiKeyUseCase, searchApiKey, apiKeyController };
