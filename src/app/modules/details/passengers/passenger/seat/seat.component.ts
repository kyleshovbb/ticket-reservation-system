import { Component, ChangeDetectionStrategy, Input } from "@angular/core";

import { Seat } from "src/app/core/models/seats-map.model";
import { Transfer, Ticket } from "src/app/core/models/tickets.model";

import { Passenger } from "../../passengers.model";

@Component({
  selector: "app-passenger-seat",
  templateUrl: "./seat.component.html",
  styleUrls: ["./seat.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SeatComponent {
  @Input() ticket: Ticket;
  @Input() passenger: Passenger;

  public get allTransfers(): Transfer[] {
    return this.ticket.routes.reduce((transfers, route) => [...transfers, ...route.transfers], []);
  }
}
