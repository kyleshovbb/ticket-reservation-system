import { Input, OnInit, OnDestroy, Component, ChangeDetectionStrategy } from "@angular/core";
import { Subscription } from "rxjs";
import { startWith } from "rxjs/operators";

import { Transfer } from "src/app/core/models/tickets.model";
import { Characteristic, SeatLocation, Seat, SeatsMap, Legends } from "src/app/core/models/seats-map.model";

import { SeatPrice } from "./seats-map.models";
import { SeatsMapService } from "./seats-map.service";
import { Passenger, TransferSeat } from "../../../passengers.model";

@Component({
  selector: "app-seats-map",
  templateUrl: "./seats-map.component.html",
  styleUrls: ["./seats-map.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SeatsMapService]
})
export class SeatsMapComponent implements OnInit, OnDestroy {
  @Input() ticketId: string;
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

    this.seatsMapService.loadSeatsMap(this.transfer.id).subscribe();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  public onToggle() {
    this.isActive = !this.isActive;
  }

  public onSelectSeat(seat: Seat) {
    if (!seat.isOccupied) {
      const transferSeat = this.getTransferSeat(seat);
      this.passenger.selectSeat(transferSeat);
      this.seatsMapService.reserveSeat(transferSeat).subscribe();
    }
  }

  private getTransferSeat(seat: Seat): TransferSeat {
    return {
      seat,
      ticketId: this.ticketId,
      transferId: this.transfer.id
    };
  }

  private subscribeToSeatsMap() {
    return this.seatsMapService.seatsMap$.subscribe(seatsMap => {
      this.seatsMap = seatsMap;
      this.saveLegends(seatsMap.legends);
    });
  }

  private subscribeToSelectSeat() {
    return this.passenger.selectedSeats$.pipe(startWith(this.passenger.selectedSeats)).subscribe(selectedSeats => {
      const transferSeat = selectedSeats.find(selectedSeat => selectedSeat.transferId === this.transfer.id);

      this.selectedSeat = transferSeat ? transferSeat.seat : null;
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
