import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { UserService } from "./core/services/user.service";

@Component({
  selector: "app-root",
  template: "<router-outlet></router-outlet>"
})
export class AppComponent implements OnInit, OnDestroy {
  private subs = new Subscription();

  constructor(private user: UserService) {}

  ngOnInit(): void {
    this.subs.add(this.user.checkAuth().subscribe());
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
