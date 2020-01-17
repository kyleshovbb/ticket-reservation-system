import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "src/app/shared/shared.module";

import { AuthComponent } from "./auth-modal.component";
import { LoginComponent } from "./login/login.component";
import { AuthModalService } from "./auth-modal.service";
import { RegistrationComponent } from "./registration/registration.component";

@NgModule({
  exports: [AuthComponent],
  imports: [CommonModule, SharedModule],
  declarations: [LoginComponent, RegistrationComponent, AuthComponent],
  providers: [AuthModalService]
})
export class AuthModalModule {}
