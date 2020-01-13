import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AuthService } from "./services/auth.service";
import { UserService } from "./services/user.service";

@NgModule({
  declarations: [],
  providers: [UserService, AuthService],
  imports: [CommonModule]
})
export class CoreModule {}
