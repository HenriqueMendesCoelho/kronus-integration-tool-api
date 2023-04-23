export interface ITmdbRepository {
  callTmdb(
    url: string,
    method: string,
    body?: object,
    params?: object
  ): Promise<any>;
}
