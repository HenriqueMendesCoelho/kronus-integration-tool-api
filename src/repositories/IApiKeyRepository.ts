import { ApiKey } from '../models/ApiKey';

export interface IApiKeyRepository {
  findByKey(key: string): Promise<ApiKey>;
  findAll(): Promise<Array<ApiKey>>;
  save(apikey: ApiKey): Promise<ApiKey>;
}
