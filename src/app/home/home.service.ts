import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject, of } from "rxjs";
import { tap, catchError } from "rxjs/operators";

import { TicketInfo } from "./home.model";

@Injectable()
export class HomeService {
  private ticketsSubject = new Subject<TicketInfo[]>();

  public get tickets$() {
    return this.ticketsSubject.asObservable();
  }

  constructor(private http: HttpClient) {}

  public loadTickets(params: any) {
    return this.fetchTickets(params).pipe(
      tap(tickets => {
        this.ticketsSubject.next(tickets);
      }),
      catchError(() => of({}))
    );
  }

  private fetchTickets(params: any) {
    return this.http.get<TicketInfo[]>("tickets", { params });
  }
}
