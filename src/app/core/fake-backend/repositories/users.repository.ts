import { LoginRequest } from "src/app/core/models/auth.model";

import { Users, User } from "../models/user.model";

enum StorageKeys {
  Users = "users"
}

export class UsersRepository {
  private _users: Users = JSON.parse(localStorage.getItem(StorageKeys.Users)) || [];

  constructor() {}

  public authentication(authenticationData: LoginRequest): boolean {
    return this._users.some(
      user => user.password === authenticationData.password && authenticationData.username === user.username
    );
  }

  public createUser(user: User): boolean {
    try {
      this._users.push(user);
      localStorage.setItem(StorageKeys.Users, JSON.stringify(this._users));
      return true;
    } catch (e) {
      return false;
    }
  }
}
