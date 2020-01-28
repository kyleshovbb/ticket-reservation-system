import { Component, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy } from "@angular/core";

import { Seat, Legends } from "src/app/core/models/seats-map.model";

import { SeatPrice } from "./info.model";

@Component({
  selector: "app-seat-info",
  templateUrl: "./info.component.html",
  styleUrls: ["./info.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoComponent implements OnChanges {
  public seatPrices: SeatPrice[];

  @Input() selectedSeat: Seat;
  @Input() legends: Legends;

  private get defaultLegends(): SeatPrice[] {
    return [{ name: "occupied" }, { name: "selected" }];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.legends) {
      this.saveLegends(changes.legends.currentValue);
    }
  }

  private saveLegends(legends: Legends): void {
    const parsedLegends = Object.keys(legends).map(key => ({
      name: key,
      price: legends[key]
    }));

    this.seatPrices = [...this.defaultLegends, ...parsedLegends];
  }
}
