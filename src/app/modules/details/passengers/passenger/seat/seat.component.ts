import { Component, ChangeDetectionStrategy, Input } from "@angular/core";

import { Seat } from "src/app/core/models/seats-map.model";
import { TravelRoute, Transfer } from "src/app/core/models/tickets.model";

import { Passenger } from "../../passengers.model";

@Component({
  selector: "app-passenger-seat",
  templateUrl: "./seat.component.html",
  styleUrls: ["./seat.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SeatComponent {
  @Input() routes: TravelRoute[];
  @Input() passenger: Passenger;

  public selectSeat(seat: Seat) {
    this.passenger.selectSeat(seat);
  }

  public get allTransfers(): Transfer[] {
    return this.routes.reduce((transfers, route) => [...transfers, ...route.transfers], []);
  }
}
