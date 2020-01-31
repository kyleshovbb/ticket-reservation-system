import { BehaviorSubject } from "rxjs";

import { Seat } from "src/app/core/models/seats-map.model";

export interface PersonalInformation {
  gender: string;
  lastName: string;
  firstName: string;
  dateOfBirth: string;
  nationality: string;
  documentNumber: string;
  expirationDate: string;
}

export enum BaggageType {
  Default = "default",
  Checked = "checked",
  SportEquipment = "sportEquipment"
}

export interface Baggage {
  type: BaggageType;
  name: string;
  price: number;
  description: string;
  isStatic: boolean;
}

export interface TransferSeat {
  ticketId: string;
  transferId: string;
  seat: Seat;
}

export class Passenger {
  private personalInformationSubject = new BehaviorSubject<PersonalInformation>(null);
  private selectedSeatsSubject = new BehaviorSubject<TransferSeat[]>([]);
  private baggagesSubject = new BehaviorSubject<Baggage[]>([
    {
      type: BaggageType.Default,
      name: "Cabin Baggage",
      description: "42x32x20cm",
      price: 0,
      isStatic: true
    }
  ]);

  constructor(public number: number) {}

  public get baggages() {
    return this.baggagesSubject.getValue();
  }

  public get baggages$() {
    return this.baggagesSubject.asObservable();
  }

  public get personalInformation$() {
    return this.personalInformationSubject.asObservable();
  }

  public get selectedSeats() {
    return this.selectedSeatsSubject.getValue();
  }

  public get selectedSeats$() {
    return this.selectedSeatsSubject.asObservable();
  }

  public changePersonalInformation(personalInformation: PersonalInformation) {
    this.personalInformationSubject.next(personalInformation);
  }

  public addBaggage(baggageType: BaggageType, count = 1) {
    const newBaggages = new Array(count).fill(this.getBaggageByType(baggageType));
    this.baggagesSubject.next([...this.baggages, ...newBaggages]);
  }

  public removeBaggage(index: number) {
    const baggages = this.baggages.slice();
    baggages.splice(index, 1);
    this.baggagesSubject.next(baggages);
  }

  public selectSeat(seat: Seat, ticketId: string, transferId: string) {
    const transferSeat: TransferSeat = {
      ticketId,
      transferId,
      seat
    };

    this.saveSelectedSeat(transferSeat);
  }

  public getSeatedSeatByTransferId(transferId: string): Seat {
    const transferSeat = this.selectedSeats.find(transferSeat => transferSeat.transferId === transferId);
    return transferSeat.seat;
  }

  public clearSeat(transferId: string) {
    const selectedSeats = this.selectedSeats.slice();
    const previousSeatIndex = selectedSeats.findIndex(selectedSeat => selectedSeat.transferId === transferId);

    if (previousSeatIndex !== -1) {
      selectedSeats.splice(previousSeatIndex, 1);
    }

    this.selectedSeatsSubject.next(selectedSeats);
  }

  private saveSelectedSeat(transferSeat: TransferSeat) {
    const selectedSeats = this.selectedSeats.slice();
    const previousSeatIndex = selectedSeats.findIndex(
      selectedSeat => selectedSeat.transferId === transferSeat.transferId
    );

    if (previousSeatIndex !== -1) {
      selectedSeats.splice(previousSeatIndex, 1);
    }

    this.selectedSeatsSubject.next([...selectedSeats, transferSeat]);
  }

  private getBaggageByType(baggageType: BaggageType): Baggage {
    switch (baggageType) {
      case BaggageType.Checked: {
        return {
          type: BaggageType.Checked,
          name: "Checked Baggage",
          description: "23 kg",
          price: 80,
          isStatic: false
        };
      }

      case BaggageType.SportEquipment: {
        return {
          type: BaggageType.SportEquipment,
          name: "Sport Equipment",
          price: 30,
          description: "Ski, Snowboard, Surf equipment, Bicycle, etc.",
          isStatic: false
        };
      }
    }
  }
}
