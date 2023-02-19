import { ApiKeyRepository } from '../../repositories/implementations/ApiKeyRepository';
import { ApiKeyController } from './ApiKeyController';
import { CreateApiKeyUseCase } from './createApiKey/CreateApiKeyUseCase';
import { DeleteApiKeyUseCase } from './deleteApiKey/DeleteApiKeyUseCase';
import { SearchApiKey } from './searchApiKey/SearchApiKey';

const apiKeyRepository = new ApiKeyRepository();

const createApiKeyUseCase = new CreateApiKeyUseCase(apiKeyRepository);
const searchApiKey = new SearchApiKey(apiKeyRepository);
const deleteApiKey = new DeleteApiKeyUseCase(apiKeyRepository);

const apiKeyController = new ApiKeyController(
  createApiKeyUseCase,
  searchApiKey,
  deleteApiKey
);

export { createApiKeyUseCase, searchApiKey, deleteApiKey, apiKeyController };
