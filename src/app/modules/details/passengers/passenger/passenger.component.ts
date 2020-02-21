import { Component, Input, ChangeDetectionStrategy, OnInit } from "@angular/core";

import { Ticket } from "src/app/core/models/tickets.model";

import { Passenger } from "../passengers.model";

@Component({
  selector: "app-passenger",
  templateUrl: "./passenger.component.html",
  styleUrls: ["./passenger.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PassengerComponent implements OnInit {
  @Input() ticket: Ticket;
  @Input() passenger: Passenger;

  public isOpen = false;

  ngOnInit(): void {
    if (this.passenger.number === 1) {
      this.isOpen = true;
    }
  }

  public toggle() {
    this.isOpen = !this.isOpen;
  }
}
