import { v4 } from 'uuid';

export class User {
  public readonly id: string;
  public username: string;
  public password: string;
  public salt: string;

  constructor(props: Omit<User, 'id'>, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = v4();
    }
  }
}
