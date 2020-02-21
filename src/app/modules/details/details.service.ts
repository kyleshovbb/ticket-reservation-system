import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { of, Observable, ReplaySubject } from "rxjs";
import { tap, catchError } from "rxjs/operators";

import { Ticket } from "src/app/core/models/tickets.model";

@Injectable()
export class DetailsService {
  private ticketDetailsSubject = new ReplaySubject<Ticket>(1);

  public get ticketDetails$() {
    return this.ticketDetailsSubject.asObservable();
  }

  constructor(private http: HttpClient) {}

  public loadTicketDetails(id: string) {
    return this.fetchTicketDetails(id).pipe(
      tap(ticket => {
        this.ticketDetailsSubject.next(ticket);
      }),
      catchError(() => of({}))
    );
  }

  private fetchTicketDetails(id: string): Observable<Ticket> {
    return this.http.get<Ticket>(`flights/book/${id}`);
  }
}
