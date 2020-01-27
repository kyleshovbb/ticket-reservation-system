import { Component, ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: "app-booking-details-seat",
  templateUrl: "./seat.component.html",
  styleUrls: ["./seat.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SeatComponent {
  public isOpen = false;

  public toggle() {
    this.isOpen = !this.isOpen;
  }

  public seatNumberSelected(seatNumber: string) {
    console.log(seatNumber);
  }
}
