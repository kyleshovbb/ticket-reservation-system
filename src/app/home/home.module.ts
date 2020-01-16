import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SearchModule } from "./search/search.module";
import { HomeComponent } from "./home.component";
import { HomeRoutingModule } from "./home-routing.module";

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, SearchModule, HomeRoutingModule]
})
export class HomeModule {}
