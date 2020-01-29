import { Component, Input } from "@angular/core";

import { TravelRoute, Transfer } from "src/app/core/models/tickets.model";

@Component({
  selector: "app-travel-route",
  templateUrl: "./travel-route.component.html",
  styleUrls: ["./travel-route.component.less"]
})
export class TravelRouteComponent {
  @Input() travelRoute: TravelRoute;

  public getEmptyArray(count: number) {
    return new Array(count);
  }

  public get firstTransfer(): Transfer {
    return this.travelRoute.transfers[0];
  }

  public get lastTransfer(): Transfer {
    return this.travelRoute.transfers[this.travelRoute.transfers.length - 1];
  }

  public get travelDuration(): string {
    const durationDate = new Date(this.travelRoute.duration);
    const durationDays = durationDate.getUTCDate() - 1;
    const durationHours = durationDate.getUTCHours() + durationDays * 24;

    return `${durationHours}h ${durationDate.getUTCMinutes()}m`;
  }

  public get stops(): number {
    return this.travelRoute.transfers.length - 1;
  }
}
