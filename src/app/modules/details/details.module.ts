import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "src/app/shared/shared.module";

import { DetailsService } from "./details.service";
import { SeatsMapService } from "./passengers/passenger/seat/seats-map/seats-map.service";
import { PassengersService } from "./passengers/passengers.service";

import { DetailsRoutingModule } from "./details-routing.module";

import { SeatComponent } from "./passengers/passenger/seat/seat.component";
import { DetailsComponent } from "./details.component";
import { BaggageComponent } from "./passengers/passenger/baggage/baggage.component";
import { SeatsMapComponent } from "./passengers/passenger/seat/seats-map/seats-map.component";
import { PassengerComponent } from "./passengers/passenger/passenger.component";
import { PassengersComponent } from "./passengers/passengers.component";
import { PersonalInformationComponent } from "./passengers/passenger/personal-information/personal-information.component";

@NgModule({
  declarations: [
    SeatComponent,
    DetailsComponent,
    BaggageComponent,
    SeatsMapComponent,
    PassengerComponent,
    PassengersComponent,
    PersonalInformationComponent
  ],
  imports: [DetailsRoutingModule, CommonModule, SharedModule],
  providers: [DetailsService, SeatsMapService, PassengersService]
})
export class DetailsModule {}
