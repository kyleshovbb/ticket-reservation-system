import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject, of, Observable } from "rxjs";
import { tap, catchError, map } from "rxjs/operators";

import { SearchFormValue } from "./search/search.model";
import { BookingTicketResponse, BookingTicket } from "./booking.model";

@Injectable()
export class BookingService {
  private bookingTicketsSubject = new Subject<BookingTicket[]>();

  public get bookingTickets$() {
    return this.bookingTicketsSubject.asObservable();
  }

  constructor(private http: HttpClient) {}

  public loadTicketsList(params: SearchFormValue) {
    return this.fetchTicketsList(params).pipe(
      tap(tickets => {
        console.log(tickets);
        this.bookingTicketsSubject.next(tickets);
      }),
      catchError(() => of({}))
    );
  }

  private fetchTicketsList(params: SearchFormValue): Observable<BookingTicket[]> {
    return this.http
      .get<BookingTicketResponse>("flights/create-session", {
        params: {
          from0: params.originPlace,
          to0: params.destinationPlace,
          date0: params.outboundDate,
          pax: String(params.adults),
          cabin: "Basic Coach|Coach|Premium Coach|Business|First|Air Taxi",
          ...(params.returnDate ? { return_date: params.returnDate } : {})
        }
      })
      .pipe(map(response => this.getBookingTickets(response)));
  }

  private getBookingTickets(response: BookingTicketResponse): BookingTicket[] {
    return Object.keys(response.itins)
      .map(iden => new BookingTicket(response, iden))
      .sort(this.compareTicketsByPrice);
  }

  private compareTicketsByPrice(a: BookingTicket, b: BookingTicket) {
    return a.ticketInfo.price - b.ticketInfo.price;
  }
}
