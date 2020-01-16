import {
  NgControl,
  NG_VALUE_ACCESSOR,
  ControlValueAccessor
} from "@angular/forms";
import {
  Input,
  Injector,
  Component,
  forwardRef,
  AfterViewInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef
} from "@angular/core";

import { ValidatorService } from "../validator.service";

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
export class InputNumberComponent
  implements AfterViewInit, ControlValueAccessor {
  @Input() min: number = -Infinity;
  @Input() max: number = Infinity;
  @Input() step: number = 1;
  @Input() placeholder: string;

  @ViewChild("inputNumberElement", { static: true })
  inputNumberElement: ElementRef<HTMLInputElement>;

  private _value: string | number;
  get value() {
    return this._value;
  }
  set value(value: string | number) {
    this._value = value;
    this.cdr.markForCheck();
  }

  private _error: string;
  get error() {
    return this._error;
  }
  set error(error: string) {
    this._error = error;
    this.cdr.markForCheck();
  }

  private ngControl: NgControl;

  constructor(
    private cdr: ChangeDetectorRef,
    private injector: Injector,
    private validatorService: ValidatorService
  ) {}

  ngAfterViewInit(): void {
    this.ngControl = this.injector.get(NgControl);
  }

  public onChange(value: string | number | null) {
    const currentValue = this.getCurrentValidValue(value);

    if (this.value !== currentValue) {
      this.saveValue(currentValue);
      this._change(currentValue);
      this.error = this.validatorService.getErrorsTipFromValidators(
        this.ngControl.errors
      );
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

  private getCurrentValidValue(value: string | number | null): string | number {
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

    if (val < this.min) {
      val = this.min;
    } else if (val > this.max) {
      val = this.max;
    }

    return val;
  }

  private parseValueToNumber(value: string | number): number {
    return typeof value === "string" ? parseFloat(value) : value;
  }

  private saveValue(value: string | number) {
    this.value = value;
    this.inputNumberElement.nativeElement.value = String(value);
  }
}
