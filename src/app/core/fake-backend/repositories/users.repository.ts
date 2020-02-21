import { random } from "faker";

import { User, Users } from "src/app/core/models/user.model";
import { LoginRequest, RegistrationRequest } from "src/app/core/models/auth.model";

enum UsersStorageKeys {
  Users = "users",
  AuthorizedUser = "authorized-user"
}

export class UsersRepository {
  private _authorizedUser: User = JSON.parse(sessionStorage.getItem(UsersStorageKeys.AuthorizedUser)) || null;
  private _users: Users = JSON.parse(localStorage.getItem(UsersStorageKeys.Users)) || [];

  public authentication(authenticationData: LoginRequest): User {
    const user = this._users.find(
      user => user.password === authenticationData.password && authenticationData.username === user.username
    );

    this.saveAuthorizedUser(user);

    return user;
  }

  public createUser(request: RegistrationRequest): boolean {
    const user = this.getUserByRegistrationRequest(request);

    try {
      this._users.push(user);
      localStorage.setItem(UsersStorageKeys.Users, JSON.stringify(this._users));
      return true;
    } catch (e) {
      return false;
    }
  }

  public get authorizedUser() {
    return this._authorizedUser;
  }

  private getUserByRegistrationRequest(request: RegistrationRequest) {
    return {
      ...request,
      id: random.uuid()
    };
  }

  private saveAuthorizedUser(user: User) {
    this._authorizedUser = user || null;
    sessionStorage.setItem(UsersStorageKeys.AuthorizedUser, JSON.stringify(this._authorizedUser));
  }
}
