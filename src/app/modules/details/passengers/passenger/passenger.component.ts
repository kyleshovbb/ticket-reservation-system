import { Component, Input, ChangeDetectionStrategy } from "@angular/core";

import { Ticket } from "src/app/core/models/tickets.model";

import { Passenger } from "../passengers.model";

@Component({
  selector: "app-passenger",
  templateUrl: "./passenger.component.html",
  styleUrls: ["./passenger.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PassengerComponent {
  @Input() ticket: Ticket;
  @Input() passenger: Passenger;

  public isOpen = false;

  public toggle() {
    this.isOpen = !this.isOpen;
  }
}