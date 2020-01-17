import { NgControl, NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";
import {
  Input,
  Injector,
  Component,
  ViewChild,
  forwardRef,
  ElementRef,
  AfterViewInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from "@angular/core";

import { ValidatorService } from "../../services/validator.service";

@Component({
  selector: "app-date-picker",
  templateUrl: "./date-picker.component.html",
  styleUrls: ["./date-picker.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true
    }
  ]
})
export class DatePickerComponent implements AfterViewInit, ControlValueAccessor {
  @Input() disableControl: boolean = false;

  @ViewChild("inputDatePickerElement", { static: true })
  inputDatePickerElement: ElementRef<HTMLInputElement>;

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

  private _error: string;
  private _value: string | number;
  private ngControl: NgControl;

  constructor(private cdr: ChangeDetectorRef, private injector: Injector, private validatorService: ValidatorService) {}

  ngAfterViewInit(): void {
    this.ngControl = this.injector.get(NgControl);
  }

  public onChange(value: string) {
    this.saveValue(value);
    this._change(value);
    this.error = this.validatorService.getErrorsTipFromValidators(this.ngControl.errors);
  }

  registerOnChange(fn: (value: string) => void) {
    this._change = fn;
  }

  registerOnTouched(fn: Function) {}

  writeValue(value: string) {}

  private _change = (value: string) => {};

  private saveValue(value: string | number) {
    this.value = value;
    this.inputDatePickerElement.nativeElement.value = String(value);
  }
}
