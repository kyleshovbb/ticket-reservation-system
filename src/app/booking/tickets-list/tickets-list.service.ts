import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject, of, Observable } from "rxjs";
import { tap, catchError, map } from "rxjs/operators";

import { Ticket, Tickets } from "../booking.model";
import { SearchFormValue } from "./search/search.model";

@Injectable()
export class TicketsListService {
  private ticketsListSubject = new Subject<Tickets>();

  public get ticketsList$() {
    return this.ticketsListSubject.asObservable();
  }

  constructor(private http: HttpClient) {}

  public loadTicketsList(params: SearchFormValue) {
    return this.fetchTicketsList(params).pipe(
      tap(tickets => {
        this.ticketsListSubject.next(tickets);
      }),
      catchError(() => of({}))
    );
  }

  private fetchTicketsList(params: SearchFormValue): Observable<Tickets> {
    const isRoundTrip = !!params.returnDate;

    return this.http
      .get<Tickets>("flights/create-session", {
        params: {
          origin: params.originPlace,
          destination: params.destinationPlace,
          departDate: params.outboundDate,
          pax: String(params.adults),
          ...(isRoundTrip ? { returnDate: params.returnDate } : {})
        }
      })
      .pipe(map(tickets => tickets.sort(this.compareTicketsByPrice)));
  }

  private compareTicketsByPrice(a: Ticket, b: Ticket) {
    return a.price - b.price;
  }
}