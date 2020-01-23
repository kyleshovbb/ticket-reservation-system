import { Component } from "@angular/core";
import { Observable } from "rxjs";

import { BookingTicket } from "../booking.model";
import { BookingService } from "../booking.service";

@Component({
  selector: "app-booking-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.less"]
})
export class ListComponent {
  public bookingTickets$: Observable<BookingTicket[]>;

  constructor(bookingService: BookingService) {
    this.bookingTickets$ = bookingService.bookingTickets$;
  }
}
