import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "src/app/shared/shared.module";

import { AuthModalComponent } from "./auth-modal.component";
import { LoginComponent } from "./login/login.component";
import { AuthModalService } from "./auth-modal.service";
import { RegistrationComponent } from "./registration/registration.component";

@NgModule({
  exports: [AuthModalComponent],
  imports: [CommonModule, SharedModule],
  declarations: [LoginComponent, RegistrationComponent, AuthModalComponent],
  providers: [AuthModalService]
})
export class AuthModalModule {}
