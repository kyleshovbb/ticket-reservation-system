import { Input, OnInit, OnDestroy, Component, ChangeDetectionStrategy } from "@angular/core";
import { Subscription } from "rxjs";
import { startWith } from "rxjs/operators";

import { Transfer } from "src/app/core/models/tickets.model";
import { Characteristic, SeatLocation, Seat, SeatsMap, Legends } from "src/app/core/models/seats-map.model";

import { SeatPrice } from "./seats-map.models";
import { Passenger } from "../../../passengers.model";
import { SeatsMapService } from "./seats-map.service";

@Component({
  selector: "app-seats-map",
  templateUrl: "./seats-map.component.html",
  styleUrls: ["./seats-map.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SeatsMapComponent implements OnInit, OnDestroy {
  @Input() transfer: Transfer;
  @Input() passenger: Passenger;

  public isActive = false;

  public seatsMap: SeatsMap;
  public seatPrices: SeatPrice[];
  public selectedSeat: Seat;

  public seatLocation = SeatLocation;
  public characteristic = Characteristic;

  private subs = new Subscription();

  private defaultLegends: SeatPrice[] = [{ name: "occupied" }, { name: "selected" }];

  public get isSelectedSeat() {
    return !!this.selectedSeat;
  }

  constructor(private seatsMapService: SeatsMapService) {}

  ngOnInit(): void {
    this.subs.add(this.subscribeToSeatsMap()).add(this.subscribeToSelectSeat());

    const plane = this.getPlaneNameByTransfer(this.transfer);
    this.seatsMapService.loadSeatsMap(plane).subscribe();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  public toggle() {
    this.isActive = !this.isActive;
  }

  public onSelectSeat(seat: Seat) {
    this.selectedSeat = seat;
    this.passenger.selectSeat(seat);
  }

  private getPlaneNameByTransfer(transfer: Transfer) {
    return `${transfer.planeNum[0]} - ${transfer.planeNum[1]}`;
  }

  private subscribeToSeatsMap() {
    return this.seatsMapService.seatsMap$.subscribe(seatsMap => {
      this.seatsMap = seatsMap;
      this.saveLegends(seatsMap.legends);
    });
  }

  private subscribeToSelectSeat() {
    return this.passenger.selectedSeat$.pipe(startWith(this.passenger.selectedSeat)).subscribe(selectedSeat => {
      this.selectedSeat = selectedSeat;
    });
  }

  private saveLegends(legends: Legends): void {
    const parsedLegends = Object.keys(legends).map(key => ({
      name: key,
      price: legends[key]
    }));

    this.seatPrices = [...this.defaultLegends, ...parsedLegends];
  }
}
