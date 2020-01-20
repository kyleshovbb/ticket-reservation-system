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

import { Option } from "../../models/form.model";
import { ValidatorService } from "../../services/validator.service";

@Component({
  selector: "app-autocomplete",
  templateUrl: "./autocomplete.component.html",
  styleUrls: ["./autocomplete.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutocompleteComponent),
      multi: true
    }
  ]
})
export class AutocompleteComponent implements AfterViewInit, ControlValueAccessor {
  @Input() options: Option[];
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

  public get areOptionsShown() {
    return this.isOpened && this.options && this.options.length > 0;
  }

  private _value: string | number;
  private _error: string;
  private isOpened: boolean = false;
  private ngControl: NgControl;

  constructor(private cdr: ChangeDetectorRef, private injector: Injector, private validatorService: ValidatorService) {}

  ngAfterViewInit(): void {
    this.ngControl = this.injector.get(NgControl);
  }

  public onChange(value: string) {
    this.isOpened = true;
    this.value = value;
    this._change(value);
    this.error = this.validatorService.getErrorsTipFromValidators(this.ngControl.errors);
  }

  public onSelect(value: string) {
    this.isOpened = false;
    this.value = value;
    this._change(value);
    this.error = this.validatorService.getErrorsTipFromValidators(this.ngControl.errors);
  }

  public onClose() {
    this.isOpened = false;
  }

  registerOnChange(fn: (value: string) => void) {
    this._change = fn;
  }

  registerOnTouched(fn: Function) {}

  writeValue(value: string) {}

  private _change = (value: string) => {};
}
