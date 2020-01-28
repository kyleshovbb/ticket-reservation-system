import { Component, ChangeDetectionStrategy, Input } from "@angular/core";

import { Seat } from "src/app/core/models/seats-map.model";
import { Ticket, Transfer } from "src/app/core/models/tickets.model";

@Component({
  selector: "app-booking-details-seat",
  templateUrl: "./seat.component.html",
  styleUrls: ["./seat.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SeatComponent {
  @Input() ticket: Ticket;

  public selectedSeat: Seat;
  public isOpen = false;

  public toggle() {
    this.isOpen = !this.isOpen;
  }

  public selectSeat(seat: Seat) {
    this.selectedSeat = seat;
  }

  public get allTransfers(): Transfer[] {
    return this.ticket.routes.reduce((transfers, route) => [...transfers, ...route.transfers], []);
  }
}
