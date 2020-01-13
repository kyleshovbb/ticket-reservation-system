import { Component, ChangeDetectionStrategy } from "@angular/core";
import { Observable } from "rxjs";

import { AuthService } from "./auth-modal.service";
import { AuthModalType } from "./auth-modal.model";

@Component({
  selector: "app-auth-modal",
  templateUrl: "./auth-modal.component.html",
  styleUrls: ["./auth-modal.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent {
  public isOpen$: Observable<boolean>;
  public authModalType$: Observable<AuthModalType>;

  constructor(private authService: AuthService) {
    this.isOpen$ = this.authService.isOpen$;
    this.authModalType$ = this.authService.authModalType$;
  }

  public onClose() {
    this.authService.close();
  }
}
