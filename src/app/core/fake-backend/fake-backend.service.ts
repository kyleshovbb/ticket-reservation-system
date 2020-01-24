import { Injectable } from "@angular/core";
import { HttpResponse, HttpParams } from "@angular/common/http";
import { of, throwError } from "rxjs";

import { User } from "./fake-backend.model";
import { LoginRequest } from "../models/auth.model";
import { TicketsSearch } from "./repositories/tickets.model";
import { TicketsRepository } from "./repositories/tickets.repository";

enum StorageKeys {
  Users = "users"
}

@Injectable()
export class FakeBackendService {
  private users: User[] = JSON.parse(localStorage.getItem(StorageKeys.Users)) || [];
  private ticketsRepository = new TicketsRepository();

  public register(user: User) {
    this.users.push(user);
    localStorage.setItem(StorageKeys.Users, JSON.stringify(this.users));

    return of(
      new HttpResponse({
        status: 201
      })
    );
  }

  public checkUser() {
    return throwError(
      new HttpResponse({
        status: 422
      })
    );
  }

  public logout() {
    return of(
      new HttpResponse({
        status: 201
      })
    );
  }

  public getTickets(params: HttpParams) {
    this.ticketsRepository.generateTickets(this.parseParams(params));

    return of(
      new HttpResponse({
        status: 201,
        body: this.ticketsRepository.getAll()
      })
    );
  }

  public login(body: LoginRequest) {
    const user = this.users.find(user => user.password === body.password && body.username === user.username);

    return !!user
      ? of(
          new HttpResponse({
            status: 201,
            body: user
          })
        )
      : throwError(
          new HttpResponse({
            status: 422,
            body: {
              message: "Bad credentials"
            }
          })
        );
  }

  private parseParams(params: HttpParams): TicketsSearch {
    return {
      origin: params.get("origin"),
      destination: params.get("destination"),
      departDate: params.get("departDate"),
      pax: params.get("pax"),
      returnDate: params.get("returnDate")
    };
  }
}
