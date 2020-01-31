import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

import { Passenger } from "./passengers.model";

@Injectable()
export class PassengersService {
  private passengersSubject = new BehaviorSubject<Passenger[]>([]);

  public get passengers() {
    return this.passengersSubject.getValue();
  }

  public get passengers$() {
    return this.passengersSubject.asObservable();
  }

  public createPassengersByAdultsCount(adultCount: number) {
    const passengers = new Array(adultCount).fill(null).map((_, index) => {
      const passengerNumber = index + 1;
      return new Passenger(passengerNumber);
    });

    this.passengersSubject.next(passengers);
  }
}
