import { Router } from "@angular/router";
import { Directive, OnInit, OnDestroy, Input, HostListener } from "@angular/core";
import { takeWhile } from "rxjs/operators";

import { UserService } from "src/app/core/services/user.service";
import { AuthModalService } from "src/app/modules/auth-modal/auth-modal.service";

import { AuthModalType } from "../models/auth-modal.model";

@Directive({
  selector: "[appAuthLink]"
})
export class AuthLinkDirective implements OnInit, OnDestroy {
  @Input("appAuthLink") routerLink: string[];

  private isAuthenticated: boolean;
  private isNotDestroyed = true;

  constructor(private userService: UserService, private authModalService: AuthModalService, private router: Router) {}

  ngOnInit(): void {
    this.handleAuthenticate();
  }

  ngOnDestroy(): void {
    this.isNotDestroyed = false;
  }

  @HostListener("click")
  checkAuth() {
    if (this.isAuthenticated) {
      this.redirectToRouterLink();
    } else {
      this.authModalService.open(AuthModalType.Login);
    }
  }

  private redirectToRouterLink() {
    this.router.navigate(this.routerLink);
  }

  private handleModalClose() {
    this.authModalService.isOpen$.pipe(takeWhile(() => this.isNotDestroyed)).subscribe(() => {});
  }

  private handleAuthenticate() {
    this.userService.isAuthenticated$.pipe(takeWhile(() => this.isNotDestroyed)).subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });
  }
}
