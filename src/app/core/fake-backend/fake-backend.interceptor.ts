import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from "@angular/common/http";
import { of } from "rxjs";
import { mergeMap } from "rxjs/operators";

import { FakeBackendService } from "./fake-backend.service";

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  constructor(private fakeBackend: FakeBackendService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return of(null).pipe(mergeMap(() => this.handleRoute(req, next)));
  }

  private handleRoute(req: HttpRequest<any>, next: HttpHandler) {
    const { url, method, body } = req;

    switch (true) {
      case url.endsWith("check-auth") && method === "GET":
        return this.fakeBackend.checkUser();
      case url.endsWith("logout") && method === "GET":
        return this.fakeBackend.logout();
      case url.endsWith("login") && method === "POST":
        return this.fakeBackend.login(body);
      case url.endsWith("register") && method === "POST":
        return this.fakeBackend.register(body);
      default:
        return next.handle(req);
    }
  }
}
