import { Component, ChangeDetectionStrategy } from "@angular/core";
import { Observable } from "rxjs";

import { UserService } from "src/app/core/services/user.service";
import { AuthModalType } from "src/app/auth-modal/auth-modal.model";
import { AuthModalService } from "src/app/auth-modal/auth-modal.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  public isUserAuthenticated$: Observable<boolean>;

  constructor(
    private user: UserService,
    private authModalService: AuthModalService
  ) {
    this.isUserAuthenticated$ = this.user.isAuthenticated$;
  }

  public openAuthModal(authType: AuthModalType) {
    this.authModalService.open(authType);
  }

  public logout() {
    return this.user.logout().subscribe();
  }
}
