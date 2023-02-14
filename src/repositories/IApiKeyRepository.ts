import { ApiKey } from '../models/ApiKey';

export interface IApiKeyRepository {
  findByKey(key: string): Promise<ApiKey>;
  save(apikey: ApiKey): Promise<ApiKey>;
}
