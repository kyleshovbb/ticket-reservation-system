import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { UserService } from "src/app/core/services/user.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.less"]
})
export class HeaderComponent implements OnInit, OnDestroy {
  public isUserAuthenticated: boolean;

  private subs = new Subscription();

  constructor(private user: UserService) {}

  ngOnInit(): void {
    this.subscribeToUserAuthenticate();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private subscribeToUserAuthenticate() {
    this.subs.add(
      this.user.isAuthenticated.subscribe(isAuthenticated => {
        this.isUserAuthenticated = isAuthenticated;
      })
    );
  }
}
