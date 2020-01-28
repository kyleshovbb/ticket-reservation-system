import { Users, User } from "src/app/core/models/user.model";
import { LoginRequest } from "src/app/core/models/auth.model";

enum UsersStorageKeys {
  Users = "users"
}

export class UsersRepository {
  private _users: Users = JSON.parse(localStorage.getItem(UsersStorageKeys.Users)) || [];

  constructor() {}

  public authentication(authenticationData: LoginRequest): boolean {
    return this._users.some(
      user => user.password === authenticationData.password && authenticationData.username === user.username
    );
  }

  public createUser(user: User): boolean {
    try {
      this._users.push(user);
      localStorage.setItem(UsersStorageKeys.Users, JSON.stringify(this._users));
      return true;
    } catch (e) {
      return false;
    }
  }
}
