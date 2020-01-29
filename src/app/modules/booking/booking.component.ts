import { Component, ChangeDetectionStrategy } from "@angular/core";
import { Observable } from "rxjs";

import { Tickets } from "src/app/core/models/tickets.model";

import { BookingService } from "./booking.service";

@Component({
  selector: "app-booking",
  templateUrl: "./booking.component.html",
  styleUrls: ["./booking.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookingComponent {
  public ticketsList$: Observable<Tickets>;

  constructor(ticketsListService: BookingService) {
    this.ticketsList$ = ticketsListService.ticketsList$;
  }
}
