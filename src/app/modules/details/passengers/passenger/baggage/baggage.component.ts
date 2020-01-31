import { Component, Input } from "@angular/core";

import { Passenger } from "../../passengers.model";
import { BaggageType } from "./baggage.model";

@Component({
  selector: "app-passenger-baggage",
  templateUrl: "./baggage.component.html",
  styleUrls: ["./baggage.component.less"]
})
export class BaggageComponent {
  @Input() passenger: Passenger;

  public baggageType = BaggageType;
  public baggageCount = 1;

  public addBaggage(baggageType: BaggageType, count = 1) {
    this.passenger.addBaggage(baggageType, count);
  }

  public removeBaggage(index: number) {
    this.passenger.removeBaggage(index);
  }
}
