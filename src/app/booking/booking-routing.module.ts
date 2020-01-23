import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { DetailsComponent } from "./details/details.component";
import { TicketsListComponent } from "./tickets-list/tickets-list.component";

const routes: Routes = [
  {
    path: "details",
    component: DetailsComponent
  },
  {
    path: "",
    component: TicketsListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingRoutingModule {}
