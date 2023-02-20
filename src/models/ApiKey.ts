export class ApiKey {
  public key: string;
  public name: string;

  constructor(props: ApiKey) {
    Object.assign(this, props);
  }
}
