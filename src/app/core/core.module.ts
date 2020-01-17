import { NgModule, ModuleWithProviders } from "@angular/core";

import { AuthGuard } from "./guards/auth.guard";
import { AuthService } from "./services/auth.service";
import { UserService } from "./services/user.service";

@NgModule()
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [UserService, AuthService, AuthGuard]
    };
  }
}
