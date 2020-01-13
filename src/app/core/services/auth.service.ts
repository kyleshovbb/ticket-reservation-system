import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

export interface LoginRequest {
  username: string;
  password: string;
}

@Injectable({ providedIn: "root" })
export class AuthService {
  constructor(private http: HttpClient) {}

  public login(body: LoginRequest) {
    return this.http.post("login", body);
  }

  public logout() {
    return this.http.get("logout");
  }

  public checkAuth() {
    return this.http.get("check-auth");
  }
}
