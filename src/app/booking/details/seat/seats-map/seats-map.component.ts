import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from "@angular/core";

import { SeatsMap, Characteristic, SeatLocation, Seat } from "src/app/core/models/seats-map.model";

@Component({
  selector: "app-seats-map",
  templateUrl: "./seats-map.component.html",
  styleUrls: ["./seats-map.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SeatsMapComponent {
  @Input() seatsMap: SeatsMap;
  @Output() selectSeat = new EventEmitter();

  public seatLocation = SeatLocation;
  public characteristic = Characteristic;

  public onSelectSeat(seat: Seat) {
    if (!seat.isOccupied) {
      this.selectSeat.emit(seat);
    }
  }
}
