import { CommonModule } from "@angular/common";
import { NgModule, ModuleWithProviders } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { ValidatorService } from "./services/validator.service";
import { RadioComponent } from "./components/radio/radio.component";
import { InputComponent } from "./components/input/input.component";
import { SelectComponent } from "./components/select/select.component";
import { RadioGroupComponent } from "./components/radio/radio-group.component";
import { DatePickerComponent } from "./components/date-picker/date-picker.component";
import { InputNumberComponent } from "./components/input-number/input-number.component";
import { AutocompleteComponent } from "./components/autocomplete/autocomplete.component";

@NgModule({
  declarations: [
    InputComponent,
    RadioComponent,
    SelectComponent,
    DatePickerComponent,
    RadioGroupComponent,
    InputNumberComponent,
    AutocompleteComponent
  ],
  imports: [CommonModule, FormsModule],
  exports: [
    FormsModule,
    InputComponent,
    SelectComponent,
    ReactiveFormsModule,
    DatePickerComponent,
    RadioGroupComponent,
    InputNumberComponent,
    AutocompleteComponent
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [ValidatorService]
    };
  }
}
