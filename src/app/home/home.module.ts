import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FormModule } from "../shared/form/form.module";
import { HomeService } from "./home.service";
import { HomeComponent } from "./home.component";
import { SearchComponent } from "./search/search.component";
import { HomeRoutingModule } from "./home-routing.module";

@NgModule({
  declarations: [HomeComponent, SearchComponent],
  imports: [CommonModule, HomeRoutingModule, FormModule],
  providers: [HomeService]
})
export class HomeModule {}
