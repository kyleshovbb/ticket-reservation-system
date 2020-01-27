import { Injectable } from "@angular/core";

import { PlaneSeatMap, SeatStatus } from "./seats-map.model";

@Injectable()
export class SeatsMapService {
  public planeSeatMap: PlaneSeatMap = new PlaneSeatMap();

  constructor() {
    this.bookRandomSeats();
  }

  private bookRandomSeats() {
    this.planeSeatMap.seatRows.forEach(seatRow => {
      seatRow.seats.forEach(seat => {
        if (Math.random() < 0.3) {
          seat.status = SeatStatus.Occupied;
        }
      });
    });
  }
}
