import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FormModule } from "src/app/shared/form/form.module";

import { SearchService } from "./search.service";
import { SearchComponent } from "./search.component";

@NgModule({
  declarations: [SearchComponent],
  providers: [SearchService],
  imports: [CommonModule, FormModule],
  exports: [SearchComponent]
})
export class SearchModule {}
