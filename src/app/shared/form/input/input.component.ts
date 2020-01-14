import {
  ControlValueAccessor,
  NgControl,
  NG_VALUE_ACCESSOR
} from "@angular/forms";
import {
  Input,
  Component,
  ChangeDetectionStrategy,
  OnDestroy,
  forwardRef,
  Injector,
  AfterViewInit
} from "@angular/core";
import { Subscription } from "rxjs";

import { ValidatorService } from "../validator.service";

@Component({
  selector: "app-input",
  templateUrl: "./input.component.html",
  styleUrls: ["./input.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent
  implements AfterViewInit, OnDestroy, ControlValueAccessor {
  @Input() placeholder: string;

  public error = "";

  private ngControl: NgControl;
  private subs = new Subscription();

  constructor(
    private injector: Injector,
    private validatorService: ValidatorService
  ) {}

  ngAfterViewInit(): void {
    this.ngControl = this.injector.get(NgControl);

    this.subscribeToStatusChange();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  registerOnChange(fn: (value: string) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: Function) {}

  writeValue(value: string) {}

  onChange = (value: string) => {
    this.onChange(value);
  };

  private subscribeToStatusChange() {
    this.subs.add(
      this.ngControl.control.valueChanges.subscribe(() => {
        this.error = this.validatorService.getErrorsTipFromValidators(
          this.ngControl.errors
        );
      })
    );
  }
}
