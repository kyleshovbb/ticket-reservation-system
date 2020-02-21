import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AuthGuard } from "src/app/core/guards/auth.guard";

const routes: Routes = [
  {
    path: "booking",
    loadChildren: () => import("./modules/booking/booking.module").then(m => m.BookingModule)
  },
  {
    path: "details/:id",
    canActivate: [AuthGuard],
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
