import { NgControl, NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";
import {
  Input,
  Injector,
  Component,
  forwardRef,
  AfterViewInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from "@angular/core";

import { ValidatorService } from "../../services/validator.service";

@Component({
  selector: "app-input-number",
  templateUrl: "./input-number.component.html",
  styleUrls: ["./input-number.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputNumberComponent),
      multi: true
    }
  ]
})
export class InputNumberComponent implements AfterViewInit, ControlValueAccessor {
  @Input() min: number;
  @Input() max: number;
  @Input() step: number = 1;
  @Input() placeholder: string;

  public get value() {
    return this._value;
  }

  public set value(value: string | number) {
    this._value = value;
    this.cdr.markForCheck();
  }

  public get error() {
    return this._error;
  }

  public set error(error: string) {
    this._error = error;
    this.cdr.markForCheck();
  }

  private _value: string | number;
  private _error: string;
  private ngControl: NgControl;

  constructor(private cdr: ChangeDetectorRef, private injector: Injector, private validatorService: ValidatorService) {}

  ngAfterViewInit(): void {
    this.ngControl = this.injector.get(NgControl);
  }

  public onChange(value: string | number) {
    const currentValue = this.getCurrentValidValue(value);

    if (this.value !== currentValue) {
      this.value = currentValue;
      this._change(currentValue);
      this.error = this.validatorService.getErrorsTipFromValidators(this.ngControl.errors);
    }
  }

  registerOnChange(fn: (value: string | number) => void) {
    this._change = fn;
  }

  registerOnTouched(fn: Function) {}

  writeValue(value: string | number) {
    this.value = value;
  }

  private _change = (value: string | number) => {};

  private getCurrentValidValue(value: string | number): string | number {
    let val: string | number;

    if (value === "" || value === null) {
      val = "";
    } else {
      val = this.getValidValue(value);
    }

    return val;
  }

  private getValidValue(value: string | number): number {
    let val = this.parseValueToNumber(value);

    if (typeof this.min === "number" && val < this.min) {
      val = this.min;
    } else if (typeof this.max === "number" && val > this.max) {
      val = this.max;
    }

    return val;
  }

  private parseValueToNumber(value: string | number): number {
    return typeof value === "string" ? parseFloat(value) : value;
  }
}
