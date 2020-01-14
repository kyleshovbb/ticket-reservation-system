import { Injectable } from "@angular/core";
import { of, ReplaySubject } from "rxjs";
import { first, catchError, tap } from "rxjs/operators";

import { AuthService, LoginRequest } from "./auth.service";

@Injectable({ providedIn: "root" })
export class UserService {
  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private auth: AuthService) {}

  public checkAuth() {
    return this.auth.checkAuth().pipe(
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
    return this.auth.login(body).pipe(
      first(),
      tap(() => {
        this.isAuthenticatedSubject.next(true);
      })
    );
  }

  public logout() {
    return this.auth.logout().pipe(
      tap(() => {
        this.isAuthenticatedSubject.next(false);
      }),
      catchError(() => of({}))
    );
  }
}
