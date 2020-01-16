import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { RadioComponent } from "./radio/radio.component";
import { InputComponent } from "./input/input.component";
import { ValidatorService } from "./validator.service";
import { RadioGroupComponent } from "./radio/radio-group.component";

@NgModule({
  declarations: [InputComponent, RadioComponent, RadioGroupComponent],
  providers: [ValidatorService],
  imports: [CommonModule, FormsModule],
  exports: [
    InputComponent,
    RadioGroupComponent,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class FormModule {}
