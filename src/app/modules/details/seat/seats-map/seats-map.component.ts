import { Input, Output, OnInit, OnDestroy, Component, EventEmitter, ChangeDetectionStrategy } from "@angular/core";
import { Subscription } from "rxjs";

import { Transfer } from "src/app/core/models/tickets.model";
import { Characteristic, SeatLocation, Seat, SeatsMap, Legends } from "src/app/core/models/seats-map.model";

import { SeatsMapService } from "./seats-map.service";
import { SeatPrice, PassengersRepository } from "./seats-map.models";

@Component({
  selector: "app-seats-map",
  templateUrl: "./seats-map.component.html",
  styleUrls: ["./seats-map.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SeatsMapComponent implements OnInit, OnDestroy {
  @Input() adult: number;
  @Input() transfer: Transfer;
  @Output() selectSeats = new EventEmitter<Seat[]>();

  public passengersRepository = new PassengersRepository();

  public isActive = false;

  public seatsMap: SeatsMap;
  public seatPrices: SeatPrice[];

  public seatLocation = SeatLocation;
  public characteristic = Characteristic;

  private subs = new Subscription();

  private defaultLegends: SeatPrice[] = [{ name: "occupied" }, { name: "selected" }];

  constructor(private seatsMapService: SeatsMapService) {}

  ngOnInit(): void {
    this.passengersRepository.generatePassengersByAdultCount(this.adult);

    this.subs.add(this.subscribeToSeatsMap());

    const plane = this.getPlaneNameByTransfer(this.transfer);
    this.seatsMapService.loadSeatsMap(plane).subscribe();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  public toggle() {
    this.isActive = !this.isActive;
  }

  public onToggleSeat(seat: Seat) {
    this.passengersRepository.toggleSeat(seat);
    const seats = this.passengersRepository.getAllSeats();
    this.selectSeats.emit(seats);
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

  private saveLegends(legends: Legends): void {
    const parsedLegends = Object.keys(legends).map(key => ({
      name: key,
      price: legends[key]
    }));

    this.seatPrices = [...this.defaultLegends, ...parsedLegends];
  }
}
