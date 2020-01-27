import { Router } from "@angular/router";
import { Component, ChangeDetectionStrategy } from "@angular/core";
import { Observable } from "rxjs";

import { Tickets } from "../booking.model";
import { TicketsListService } from "./tickets-list.service";

@Component({
  selector: "app-booking-tickets-list",
  templateUrl: "./tickets-list.component.html",
  styleUrls: ["./tickets-list.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketsListComponent {
  public ticketsList$: Observable<Tickets>;

  constructor(ticketsListService: TicketsListService) {
    this.ticketsList$ = ticketsListService.ticketsList$;
  }
}
