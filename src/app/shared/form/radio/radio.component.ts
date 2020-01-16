import {
  Input,
  Output,
  Component,
  EventEmitter,
  ChangeDetectionStrategy
} from "@angular/core";

@Component({
  selector: "app-radio",
  templateUrl: "./radio.component.html",
  styleUrls: ["./radio.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RadioComponent {
  @Input() value: string;
  @Input() label: string;
  @Input() isChecked: boolean;

  @Output() valueChange = new EventEmitter<string>();

  public onClick() {
    this.valueChange.emit(this.value);
  }
}
