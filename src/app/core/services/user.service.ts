import { Injectable } from "@angular/core";
import { of, ReplaySubject } from "rxjs";
import { catchError, tap } from "rxjs/operators";

import { AuthService } from "./auth.service";
import { LoginRequest } from "../models/auth.model";

@Injectable()
export class UserService {
  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);

  public get isAuthenticated$() {
    return this.isAuthenticatedSubject.asObservable();
  }

  constructor(private authService: AuthService) {}

  public checkAuth() {
    return this.authService.checkAuth().pipe(
      tap(
        () => {
          this.isAuthenticatedSubject.next(true);
        },
        () => {
          this.isAuthenticatedSubject.next(false);
        }
      ),
      catchError(() => of(false))
    );
  }

  public login(body: LoginRequest) {
    return this.authService.login(body).pipe(
      tap(() => {
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
