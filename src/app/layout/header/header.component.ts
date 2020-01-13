import { Component, ChangeDetectionStrategy } from "@angular/core";
import { Observable } from "rxjs";

import { UserService } from "src/app/core/services/user.service";
import { AuthService } from "src/app/auth-modal/auth-modal.service";
import { AuthModalType } from "src/app/auth-modal/auth-modal.model";

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
    private authModalService: AuthService
  ) {
    this.isUserAuthenticated$ = this.user.isAuthenticated$;
  }

  public openAuthModal(authType: AuthModalType) {
    this.authModalService.open(authType);
  }
}
