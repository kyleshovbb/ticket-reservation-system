import { ActivatedRoute } from "@angular/router";
import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { Observable } from "rxjs";

import { Baggage, BaggageType } from "./baggage/baggage.model";
import { BookingTicket } from "../booking.model";
import { DetailsService } from "./details.service";

@Component({
  selector: "app-booking-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailsComponent implements OnInit {
  public ticketDetails$: Observable<BookingTicket>;
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
    // const queryParams = this.route.snapshot.queryParams;
    // this.detailsService.loadTicketDetails(queryParams).subscribe();
  }
}
