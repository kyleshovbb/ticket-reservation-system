import { Component, Input, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { Observable } from "rxjs";

import { Ticket } from "src/app/core/models/tickets.model";

import { Passenger } from "./passengers.model";
import { PassengersService } from "./passengers.service";

@Component({
  selector: "app-passengers",
  templateUrl: "./passengers.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PassengersComponent implements OnInit {
  public passengers$: Observable<Passenger[]>;

  @Input() ticket: Ticket;

  constructor(private passengersService: PassengersService) {
    this.passengers$ = this.passengersService.passengers$;
  }

  ngOnInit(): void {
    this.passengersService.createPassengersByAdultsCount(this.ticket.adult);
  }
}
