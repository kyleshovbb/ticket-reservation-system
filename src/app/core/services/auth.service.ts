import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { LoginRequest, RegistrationRequest } from "../models/auth.model";

@Injectable({ providedIn: "root" })
export class AuthService {
  constructor(private http: HttpClient) {}

  public login(body: LoginRequest) {
    return this.http.post("login", body);
  }

  public register(body: RegistrationRequest) {
    return this.http.post("register", body);
  }

  public logout() {
    return this.http.get("logout");
  }

  public checkAuth() {
    return this.http.get("check-auth");
  }
}
