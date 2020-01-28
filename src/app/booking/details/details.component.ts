import { ActivatedRoute } from "@angular/router";
import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { Observable } from "rxjs";

import { Ticket, Transfer } from "src/app/core/models/tickets.model";

import { DetailsService } from "./details.service";
import { Baggage, BaggageType } from "./baggage/baggage.model";

@Component({
  selector: "app-booking-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailsComponent implements OnInit {
  public ticketDetails$: Observable<Ticket>;
  public baggages: Baggage[] = [
    {
      type: BaggageType.Default,
      name: "Cabin Baggage",
      description: "42x32x20cm",
      price: 0,
      isNotStatic: false
    }
  ];

  constructor(private route: ActivatedRoute, private detailsService: DetailsService) {
    this.ticketDetails$ = this.detailsService.ticketDetails$;
  }

  ngOnInit() {
    const id = this.route.snapshot.params["id"];
    this.detailsService.loadTicketDetails(id).subscribe();
  }
}
