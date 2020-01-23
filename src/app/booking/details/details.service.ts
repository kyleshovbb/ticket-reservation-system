import { Params } from "@angular/router";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject, of, Observable } from "rxjs";
import { tap, catchError, map } from "rxjs/operators";

import { BookingTicketResponse, BookingTicket } from "../booking.model";

@Injectable()
export class DetailsService {
  private ticketDetailsSubject = new Subject<BookingTicket>();

  public get ticketDetails$() {
    return this.ticketDetailsSubject.asObservable();
  }

  constructor(private http: HttpClient) {}

  public loadTicketDetails(params: Params) {
    return this.fetchTicketDetails(params).pipe(
      tap(tickets => {
        this.ticketDetailsSubject.next(tickets);
      }),
      catchError(() => of({}))
    );
  }

  private fetchTicketDetails(params: Params): Observable<BookingTicket> {
    return this.http
      .get<BookingTicketResponse>("flights/book", { params })
      .pipe(map(response => this.getBookingTicket(response)));
  }

  private getBookingTicket(response: BookingTicketResponse): BookingTicket {
    const itins = Object.keys(response.itins);
    return new BookingTicket(response, itins[0]);
  }
}
