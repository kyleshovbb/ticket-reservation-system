import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { RadioComponent } from "./radio/radio.component";
import { InputComponent } from "./input/input.component";
import { ValidatorService } from "./validator.service";
import { DatePickerComponent } from "./date-picker/date-picker.component";
import { RadioGroupComponent } from "./radio/radio-group.component";
import { InputNumberComponent } from "./input-number/input-number.component";

@NgModule({
  declarations: [
    InputComponent,
    RadioComponent,
    DatePickerComponent,
    RadioGroupComponent,
    InputNumberComponent
  ],
  providers: [ValidatorService],
  imports: [CommonModule, FormsModule],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    InputComponent,
    DatePickerComponent,
    RadioGroupComponent,
    InputNumberComponent
  ]
})
export class FormModule {}
