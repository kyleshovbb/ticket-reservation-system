import { Injectable } from "@angular/core";
import { of, ReplaySubject, BehaviorSubject } from "rxjs";
import { catchError, tap } from "rxjs/operators";

import { User } from "../models/user.model";
import { LoginRequest } from "../models/auth.model";
import { AuthApiService } from "./auth-api.service";

@Injectable()
export class UserService {
  private userSubject = new BehaviorSubject<User>(null);
  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);

  public get user() {
    return this.userSubject.getValue();
  }

  public get isAuthenticated$() {
    return this.isAuthenticatedSubject.asObservable();
  }

  constructor(private authService: AuthApiService) {}

  public checkAuth() {
    return this.authService.checkAuth().pipe(
      tap(
        (user: User) => {
          this.userSubject.next(user);
          this.isAuthenticatedSubject.next(true);
        },
        () => {
          this.userSubject.next(null);
          this.isAuthenticatedSubject.next(false);
        }
      ),
      catchError(() => of(false))
    );
  }

  public login(body: LoginRequest) {
    return this.authService.login(body).pipe(
      tap((user: User) => {
        this.userSubject.next(user);
        this.isAuthenticatedSubject.next(true);
      })
    );
  }

  public logout() {
    return this.authService.logout().pipe(
      tap(() => {
        this.isAuthenticatedSubject.next(false);
      }),
      catchError(() => of({}))
    );
  }
}
