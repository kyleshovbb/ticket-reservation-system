import { Component, ChangeDetectionStrategy, Input } from "@angular/core";

import { SeatsMap, Characteristic, SeatLocation } from "src/app/core/models/seats-map.model";

@Component({
  selector: "app-seats-map",
  templateUrl: "./seats-map.component.html",
  styleUrls: ["./seats-map.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SeatsMapComponent {
  @Input() seatsMap: SeatsMap;

  public seatLocation = SeatLocation;
  public characteristic = Characteristic;
}
