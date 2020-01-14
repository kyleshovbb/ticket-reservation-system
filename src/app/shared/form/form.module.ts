import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";

import { InputComponent } from "./input/input.component";
import { ValidatorService } from "./validator.service";

@NgModule({
  declarations: [InputComponent],
  providers: [ValidatorService],
  imports: [CommonModule],
  exports: [InputComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FormModule {}
