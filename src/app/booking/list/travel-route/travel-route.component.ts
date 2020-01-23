import { Component, Input } from "@angular/core";

import { TravelRoute } from "../../booking.model";

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
}
