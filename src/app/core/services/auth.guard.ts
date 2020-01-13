import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { Observable } from "rxjs";

import { UserService } from "./user.service";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
  constructor(private user: UserService) {}

  canActivate(): Observable<boolean> | boolean {
    return this.user.isAuthenticated;
  }
}
