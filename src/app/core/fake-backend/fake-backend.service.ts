import { Injectable } from "@angular/core";
import { HttpResponse, HttpParams } from "@angular/common/http";
import { of, throwError } from "rxjs";

import { User } from "src/app/core/models/user.model";
import { TicketsSearch } from "src/app/core/models/tickets.model";

import { LoginRequest } from "../models/auth.model";
import { UsersRepository } from "./repositories/users.repository";
import { TicketsRepository } from "./repositories/tickets.repository";
import { SeatMapRepository } from "./repositories/seat-map.repository";

@Injectable()
export class FakeBackendService {
  private usersRepository = new UsersRepository();
  private seatMapRepository = new SeatMapRepository();
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

  public getTicket(id: string) {
    return of(
      new HttpResponse({
        status: 201,
        body: this.ticketsRepository.getOne(id)
      })
    );
  }

  public getSeatMap(plane: string) {
    return of(
      new HttpResponse({
        status: 201,
        body: this.seatMapRepository.getOne(plane)
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
