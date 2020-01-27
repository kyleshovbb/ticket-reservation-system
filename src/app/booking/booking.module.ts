import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "../shared/shared.module";
import { SeatComponent } from "./details/seat/seat.component";
import { SearchService } from "./tickets-list/search/search.service";
import { DetailsService } from "./details/details.service";
import { SearchComponent } from "./tickets-list/search/search.component";
import { SeatsMapService } from "./details/seat/seats-map/seats-map.service";
import { DetailsComponent } from "./details/details.component";
import { BaggageComponent } from "./details/baggage/baggage.component";
import { SeatsMapComponent } from "./details/seat/seats-map/seats-map.component";
import { BookingRoutingModule } from "./booking-routing.module";
import { TicketsListService } from "./tickets-list/tickets-list.service";
import { TicketsListComponent } from "./tickets-list/tickets-list.component";
import { TravelRouteComponent } from "./tickets-list/travel-route/travel-route.component";
import { InfoComponent } from './details/seat/info/info.component';

@NgModule({
  declarations: [
    SeatComponent,
    SearchComponent,
    DetailsComponent,
    BaggageComponent,
    TicketsListComponent,
    TravelRouteComponent,
    SeatsMapComponent,
    InfoComponent
  ],
  imports: [CommonModule, BookingRoutingModule, SharedModule],
  providers: [TicketsListService, SearchService, DetailsService, SeatsMapService]
})
export class BookingModule {}
