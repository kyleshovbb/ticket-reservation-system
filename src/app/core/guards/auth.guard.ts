import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { Observable } from "rxjs";

import { UserService } from "../services/user.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService) {}

  canActivate(): Observable<boolean> | boolean {
    return this.userService.isAuthenticated$;
  }
}
