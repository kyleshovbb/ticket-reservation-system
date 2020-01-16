import { Injectable } from "@angular/core";
import { of, ReplaySubject } from "rxjs";
import { first, catchError, tap } from "rxjs/operators";

import { LoginRequest } from "../models/auth.model";
import { AuthService } from "./auth.service";

@Injectable({ providedIn: "root" })
export class UserService {
  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

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
      first(),
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
