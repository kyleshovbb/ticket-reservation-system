import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpHandler, HttpRequest } from "@angular/common/http";
import { of } from "rxjs";
import { mergeMap } from "rxjs/operators";

import { FakeBackendService } from "./fake-backend.service";

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  constructor(private fakeBackendService: FakeBackendService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return of(null).pipe(mergeMap(() => this.handleRoute(req, next)));
  }

  private handleRoute(req: HttpRequest<any>, next: HttpHandler) {
    const { url, method, body, params } = req;
    const splitUrl = url.split("/");

    switch (true) {
      case url.endsWith("check-auth") && method === "GET":
        return this.fakeBackendService.checkUser();
      case url.endsWith("logout") && method === "GET":
        return this.fakeBackendService.logout();
      case url.endsWith("login") && method === "POST":
        return this.fakeBackendService.login(body);
      case url.endsWith("register") && method === "POST":
        return this.fakeBackendService.register(body);
      case url.endsWith("flights/create-session") && method === "GET":
        return this.fakeBackendService.getTickets(params);
      case url.includes("flights/book") && method === "GET":
        const id = splitUrl[splitUrl.length - 1];
        return this.fakeBackendService.getTicket(id);
      case url.includes("flights/seat-map") && method === "GET":
        const plane = splitUrl[splitUrl.length - 1];
        return this.fakeBackendService.getSeatMap(plane);
      case url.endsWith("flights/reserve-seat") && method === "POST":
        return this.fakeBackendService.reserveSeat(body);
      default:
        return next.handle(req);
    }
  }
}
