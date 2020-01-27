import { Component, ChangeDetectionStrategy, OnInit } from "@angular/core";
import { Observable } from "rxjs";

import { SeatsMap } from "src/app/core/models/seats-map.model";

import { SeatsMapService } from "./seats-map/seats-map.service";

@Component({
  selector: "app-booking-details-seat",
  templateUrl: "./seat.component.html",
  styleUrls: ["./seat.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SeatComponent implements OnInit {
  public seatsMap$: Observable<SeatsMap>;
  public selectedSeat: string;
  public isOpen = false;

  constructor(private seatsMapService: SeatsMapService) {
    this.seatsMap$ = seatsMapService.seatsMap$;
  }

  ngOnInit(): void {
    this.seatsMapService.loadSeatsMap("test").subscribe();
  }

  public toggle() {
    this.isOpen = !this.isOpen;
  }

  public seatNumberSelected(seatNumber: string) {
    this.selectedSeat = seatNumber;
  }
}
