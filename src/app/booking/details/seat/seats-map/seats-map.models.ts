import { random } from "faker";

import { Price, Seat } from "src/app/core/models/seats-map.model";

export interface SeatPrice {
  name: string;
  price?: Price;
}

export class Passenger {
  public id = random.uuid();
  public selectedSeat: Seat;
  public isActive = false;

  public selectSeat(seat: Seat) {
    this.selectedSeat = seat;
  }

  public clear() {
    this.selectedSeat = null;
  }

  public activate() {
    this.isActive = true;
  }

  public inactivate() {
    this.isActive = false;
  }
}

export class PassengersRepository {
  private _passengers: Passenger[] = [];

  public get hasSelectedSeats() {
    return this._passengers.some(passenger => !!passenger.selectedSeat);
  }

  private get hasPassengerWithoutSeat() {
    return this._passengers.some(passenger => !passenger.selectedSeat);
  }

  public generatePassengersByAdultCount(adultCount: number) {
    this._passengers = new Array(adultCount).fill(null).map((_, index) => {
      const passenger = new Passenger();

      if (index === 0) {
        passenger.activate();
      }

      return passenger;
    });
  }

  public getAll() {
    return this._passengers.slice();
  }

  public getAllSeats() {
    return this._passengers.map(passenger => passenger.selectedSeat);
  }

  public hasSelectedSeat(seat: Seat) {
    return this._passengers.some(passenger => passenger.selectedSeat && passenger.selectedSeat.number === seat.number);
  }

  public toggleSeat(seat: Seat) {
    if (!seat.isOccupied) {
      if (this.hasSelectedSeat(seat)) {
        this.clearSeat(seat);
      } else {
        this.selectSeat(seat);
      }
    }
  }

  public activatePassenger(passenger: Passenger) {
    const activatedPassenger = this._passengers.find(passenger => passenger.isActive);

    activatedPassenger.inactivate();
    passenger.activate();
  }

  private clearSeat(seat: Seat) {
    const passenger = this._passengers.find(
      passenger => passenger.selectedSeat && passenger.selectedSeat.number === seat.number
    );

    passenger.clear();
    this.activatePassenger(passenger);
  }

  private selectSeat(seat: Seat) {
    const passenger = this._passengers.find(passenger => passenger.isActive);
    passenger.selectSeat(seat);
    this.activateNextPassenger(passenger.id);
  }

  private activateNextPassenger(passengerId: string) {
    const currentPassengerIndex = this._passengers.findIndex(passenger => passenger.id === passengerId);
    const nextPassenger = this._passengers[currentPassengerIndex + 1];
    const emptyPassenger = this.getEmptyPassenger();
    const currentPassenger = this._passengers[currentPassengerIndex];

    if (nextPassenger && this.hasPassengerWithoutSeat) {
      currentPassenger.inactivate();
      nextPassenger.activate();
    } else if (emptyPassenger) {
      currentPassenger.inactivate();
      emptyPassenger.activate();
    }
  }

  private getEmptyPassenger() {
    return this._passengers.find(passenger => !passenger.selectedSeat);
  }
}
