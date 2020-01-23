import { Component, Input, Output, EventEmitter } from "@angular/core";

import { Baggage, BaggageType } from "./baggage.model";

@Component({
  selector: "app-booking-details-baggage",
  templateUrl: "./baggage.component.html",
  styleUrls: ["./baggage.component.less"]
})
export class BaggageComponent {
  @Input() baggages: Baggage[];
  @Output() baggagesChange = new EventEmitter<Baggage[]>();

  public baggageType = BaggageType;
  public baggageCount = 1;

  public addBaggage(baggageType: BaggageType, count = 1) {
    const baggages = new Array(count).fill(this.getBaggageByType(baggageType));
    this.baggagesChange.emit([...this.baggages, ...baggages]);
  }

  public removeBaggage(index: number) {
    const baggages = this.baggages.slice();
    baggages.splice(index, 1);
    this.baggagesChange.emit(baggages);
  }

  private getBaggageByType(baggageType: BaggageType): Baggage {
    switch (baggageType) {
      case BaggageType.Checked: {
        return {
          type: BaggageType.Checked,
          name: "Checked Baggage",
          description: "23 kg",
          price: 80,
          isNotStatic: true
        };
      }

      case BaggageType.SportEquipment: {
        return {
          type: BaggageType.SportEquipment,
          name: "Sport Equipment",
          price: 30,
          description: "Ski, Snowboard, Surf equipment, Bicycle, etc.",
          isNotStatic: true
        };
      }
    }
  }
}
