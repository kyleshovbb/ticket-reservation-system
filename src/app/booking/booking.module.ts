import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "../shared/shared.module";
import { SearchService } from "./tickets-list/search/search.service";
import { DetailsService } from "./details/details.service";
import { SearchComponent } from "./tickets-list/search/search.component";
import { DetailsComponent } from "./details/details.component";
import { BaggageComponent } from "./details/baggage/baggage.component";
import { BookingRoutingModule } from "./booking-routing.module";
import { TicketsListService } from "./tickets-list/tickets-list.service";
import { TicketsListComponent } from "./tickets-list/tickets-list.component";
import { TravelRouteComponent } from "./tickets-list/travel-route/travel-route.component";

@NgModule({
  declarations: [SearchComponent, TicketsListComponent, TravelRouteComponent, DetailsComponent, BaggageComponent],
  imports: [CommonModule, BookingRoutingModule, SharedModule],
  providers: [TicketsListService, SearchService, DetailsService]
})
export class BookingModule {}
