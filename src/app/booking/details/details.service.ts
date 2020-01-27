import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject, of, Observable } from "rxjs";
import { tap, catchError } from "rxjs/operators";

import { Ticket } from "../booking.model";

@Injectable()
export class DetailsService {
  private ticketDetailsSubject = new Subject<Ticket>();

  public get ticketDetails$() {
    return this.ticketDetailsSubject.asObservable();
  }

  constructor(private http: HttpClient) {}

  public loadTicketDetails(id: string) {
    return this.fetchTicketDetails(id).pipe(
      tap(ticket => {
        console.log(ticket);
        this.ticketDetailsSubject.next(ticket);
      }),
      catchError(() => of({}))
    );
  }

  private fetchTicketDetails(id: string): Observable<Ticket> {
    return this.http.get<Ticket>(`flights/book/${id}`);
  }
}
