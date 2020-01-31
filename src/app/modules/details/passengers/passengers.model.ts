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

export class Passenger {
  private personalInformationSubject = new BehaviorSubject<PersonalInformation>(null);
  private selectedSeatSubject = new BehaviorSubject<Seat>(null);
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

  public get selectedSeat() {
    return this.selectedSeatSubject.getValue();
  }

  public get selectedSeat$() {
    return this.selectedSeatSubject.asObservable();
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

  public selectSeat(seat: Seat) {
    this.selectedSeatSubject.next(seat);
  }

  public clearSeat() {
    this.selectedSeatSubject.next(null);
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
