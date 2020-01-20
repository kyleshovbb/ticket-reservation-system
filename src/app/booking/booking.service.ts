import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject, of, Observable } from "rxjs";
import { tap, catchError, map } from "rxjs/operators";

import { BookingTicketResponse, TicketInfo } from "./booking.model";
import { SearchFormValue } from "./search/search.model";

@Injectable()
export class BookingService {
  private ticketsSubject = new Subject<TicketInfo[]>();

  public get tickets$() {
    return this.ticketsSubject.asObservable();
  }

  constructor(private http: HttpClient) {}

  public loadTickets(params: SearchFormValue) {
    return this.fetchTickets(params).pipe(
      tap(tickets => {
        this.ticketsSubject.next(tickets);
      }),
      catchError(() => of({}))
    );
  }

  private fetchTickets(params: SearchFormValue): Observable<TicketInfo[]> {
    return this.http
      .get<BookingTicketResponse>("prices/nearest-places-matrix", {
        params: {
          destination: params.destinationPlace,
          origin: params.originPlace,
          depart_date: params.outboundDate,
          return_date: params.returnDate,
          limit: "30",
          currency: "USD"
        }
      })
      .pipe(map(response => response.data));
  }
}
