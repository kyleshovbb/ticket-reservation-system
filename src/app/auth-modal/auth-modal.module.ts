import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AuthService } from "./auth-modal.service";
import { AuthComponent } from "./auth-modal.component";
import { LoginComponent } from "./login/login.component";
import { RegistrationComponent } from "./registration/registration.component";

@NgModule({
  declarations: [LoginComponent, RegistrationComponent, AuthComponent],
  exports: [AuthComponent],
  imports: [CommonModule],
  providers: [AuthService]
})
export class AuthModalModule {}
