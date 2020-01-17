import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { Input, Component, forwardRef, ChangeDetectorRef, ChangeDetectionStrategy } from "@angular/core";

import { Option } from "../../models/form.model";

@Component({
  selector: "app-radio-group",
  templateUrl: "./radio-group.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioGroupComponent),
      multi: true
    }
  ]
})
export class RadioGroupComponent implements ControlValueAccessor {
  @Input() options: Option[];

  public get value() {
    return this._value;
  }

  public set value(value: string) {
    this._value = value;
    this.cdr.markForCheck();
  }

  private _value: string;

  constructor(private cdr: ChangeDetectorRef) {}

  public onChange(value: string) {
    this.value = value;
    this._change(value);
  }

  registerOnChange(fn: (value: string) => void) {
    this._change = fn;
  }

  registerOnTouched(fn: Function) {}

  writeValue(value: string) {
    if (value) {
      this.value = value;
    }
  }

  private _change = (value: string) => {};
}
