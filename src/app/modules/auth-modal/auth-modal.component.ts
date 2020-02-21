import { Component, ChangeDetectionStrategy } from "@angular/core";
import { Observable } from "rxjs";

import { AuthModalType } from "src/app/core/models/auth-modal.model";

import { AuthModalService } from "./auth-modal.service";

@Component({
  selector: "app-auth-modal",
  templateUrl: "./auth-modal.component.html",
  styleUrls: ["./auth-modal.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthModalComponent {
  public isOpen$: Observable<boolean>;
  public authModalType$: Observable<AuthModalType>;

  public authModalType = AuthModalType;

  constructor(private authModalService: AuthModalService) {
    this.isOpen$ = this.authModalService.isOpen$;
    this.authModalType$ = this.authModalService.authModalType$;
  }

  public onClose() {
    this.authModalService.close();
  }
}
