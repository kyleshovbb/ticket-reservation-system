import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "src/app/shared/shared.module";

import { SearchService } from "./search/search.service";
import { SearchComponent } from "./search/search.component";
import { BookingService } from "./booking.service";
import { BookingComponent } from "./booking.component";
import { BookingRoutingModule } from "./booking-routing.module";
import { TravelRouteComponent } from "./travel-route/travel-route.component";

@NgModule({
  declarations: [SearchComponent, BookingComponent, TravelRouteComponent],
  imports: [CommonModule, BookingRoutingModule, SharedModule],
  providers: [BookingService, SearchService]
})
export class BookingModule {}
