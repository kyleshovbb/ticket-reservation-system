import { Injectable } from "@angular/core";
import { HttpResponse } from "@angular/common/http";
import { of, throwError } from "rxjs";

import { LoginRequest } from "../services/auth.service";

import { User } from "./fake-backend.model";

enum StorageKeys {
  Users = "users"
}

@Injectable({ providedIn: "root" })
export class FakeBackendService {
  private users: User[] =
    JSON.parse(localStorage.getItem(StorageKeys.Users)) || [];

  public register(user: User) {
    this.users.push(user);
    localStorage.setItem(StorageKeys.Users, JSON.stringify(this.users));

    return of(
      new HttpResponse({
        status: 201
      })
    );
  }

  public checkUser() {
    return throwError(
      new HttpResponse({
        status: 422
      })
    );
  }

  public logout() {
    return of(
      new HttpResponse({
        status: 201
      })
    );
  }

  public login(body: LoginRequest) {
    const user = this.users.find(
      user => user.password === body.password && body.username === user.username
    );

    return !!user
      ? of(
          new HttpResponse({
            status: 201,
            body: user
          })
        )
      : throwError(
          new HttpResponse({
            status: 422,
            body: {
              message: "Bad credentials"
            }
          })
        );
  }
}
