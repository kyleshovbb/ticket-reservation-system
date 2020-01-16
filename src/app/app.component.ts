import { Component, OnInit } from "@angular/core";
import { first } from "rxjs/operators";

import { UserService } from "./core/services/user.service";

@Component({
  selector: "app-root",
  template: "<router-outlet></router-outlet>"
})
export class AppComponent implements OnInit {
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService
      .checkAuth()
      .pipe(first())
      .subscribe();
  }
}
