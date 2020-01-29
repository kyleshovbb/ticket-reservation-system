import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "booking",
    loadChildren: () => import("./modules/booking/booking.module").then(m => m.BookingModule)
  },
  {
    path: "details/:id",
    loadChildren: () => import("./modules/details/details.module").then(m => m.DetailsModule)
  },
  {
    path: "**",
    redirectTo: "booking"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
