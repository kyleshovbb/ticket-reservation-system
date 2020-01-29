import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "src/app/shared/shared.module";

import { DetailsService } from "./details.service";
import { SeatsMapService } from "./seat/seats-map/seats-map.service";

import { SeatComponent } from "./seat/seat.component";
import { DetailsComponent } from "./details.component";
import { BaggageComponent } from "./baggage/baggage.component";
import { SeatsMapComponent } from "./seat/seats-map/seats-map.component";
import { DetailsRoutingModule } from "./details-routing.module";

@NgModule({
  declarations: [DetailsComponent, SeatComponent, SeatsMapComponent, BaggageComponent],
  imports: [DetailsRoutingModule, CommonModule, SharedModule],
  providers: [DetailsService, SeatsMapService]
})
export class DetailsModule {}
