import { Component, OnInit } from "@angular/core";

import { UserService } from "./core/services/user.service";

@Component({
  selector: "app-root",
  template: "<app-layout><router-outlet></router-outlet></app-layout>"
})
export class AppComponent implements OnInit {
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.checkAuth().subscribe();
  }
}
