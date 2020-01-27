import { Component, ChangeDetectionStrategy, Output, EventEmitter } from "@angular/core";

import { SeatsMapService } from "./seats-map.service";
import { RowType, SeatStatus, PassDuration, PlaneSeatMap } from "./seats-map.model";

@Component({
  selector: "app-seats-map",
  templateUrl: "./seats-map.component.html",
  styleUrls: ["./seats-map.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SeatsMapComponent {
  public rowType = RowType;
  public seatStatus = SeatStatus;
  public passDuration = PassDuration;
  public planeSeatMap: PlaneSeatMap;

  @Output() seatNumberSelected = new EventEmitter<string>();

  constructor(seatsMapService: SeatsMapService) {
    this.planeSeatMap = seatsMapService.planeSeatMap;
  }

  public onSelect(seatNumber: string, isAvailable: boolean) {
    if (isAvailable) {
      this.seatNumberSelected.emit(seatNumber);
    }
  }
}
