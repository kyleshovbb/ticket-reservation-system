import { Injectable } from "@angular/core";
import { HttpResponse, HttpParams } from "@angular/common/http";
import { of, throwError } from "rxjs";

import { User } from "./models/user.model";
import { LoginRequest } from "../models/auth.model";
import { TicketsSearch } from "./models/ticket.model";
import { UsersRepository } from "./repositories/users.repository";
import { TicketsRepository } from "./repositories/tickets.repository";

@Injectable()
export class FakeBackendService {
  private usersRepository = new UsersRepository();
  private ticketsRepository = new TicketsRepository();

  public register(user: User) {
    this.usersRepository.createUser(user);

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
    const user = this.usersRepository.authentication(body);

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
