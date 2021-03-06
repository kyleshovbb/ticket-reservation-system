import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "../shared/shared.module";
import { SearchService } from "./search/search.service";
import { ListComponent } from "./list/list.component";
import { BookingService } from "./booking.service";
import { SearchComponent } from "./search/search.component";
import { BookingComponent } from "./booking.component";
import { BookingRoutingModule } from "./booking-routing.module";
import { TravelRouteComponent } from "./list/travel-route/travel-route.component";

@NgModule({
  declarations: [BookingComponent, SearchComponent, ListComponent, TravelRouteComponent],
  imports: [CommonModule, BookingRoutingModule, SharedModule],
  providers: [BookingService, SearchService]
})
export class BookingModule {}
