import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "../shared/shared.module";
import { HomeService } from "./home.service";
import { HomeComponent } from "./home.component";
import { SearchService } from "./search/search.service";
import { SearchComponent } from "./search/search.component";
import { HomeRoutingModule } from "./home-routing.module";

@NgModule({
  declarations: [HomeComponent, SearchComponent],
  imports: [CommonModule, HomeRoutingModule, SharedModule],
  providers: [HomeService, SearchService]
})
export class HomeModule {}
