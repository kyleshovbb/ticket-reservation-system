import { Router } from "@angular/router";
import { Component, ChangeDetectionStrategy } from "@angular/core";
import { Observable } from "rxjs";

import { BookingTicket } from "../booking.model";
import { TicketsListService } from "./tickets-list.service";

@Component({
  selector: "app-booking-tickets-list",
  templateUrl: "./tickets-list.component.html",
  styleUrls: ["./tickets-list.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketsListComponent {
  public ticketsList$: Observable<BookingTicket[]>;

  constructor(private route: Router, ticketsListService: TicketsListService) {
    this.ticketsList$ = ticketsListService.ticketsList$;
  }

  public redirectToBookingDetails(ticket: BookingTicket) {
    this.route.navigate(["booking", "details"], {
      queryParams: {
        ...ticket.search,
        booking_url: ticket.bookingInfo.iden,
        itin: ticket.ticketInfo.iden
      }
    });
  }
}
