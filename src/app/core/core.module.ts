import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule, ModuleWithProviders } from "@angular/core";

import { AuthGuard } from "./guards/auth.guard";
import { AuthService } from "./services/auth.service";
import { UserService } from "./services/user.service";
import { FakeBackendService } from "./fake-backend/fake-backend.service";

import { FakeBackendInterceptor } from "./fake-backend/fake-backend.interceptor";
import { AirportsFinderInterceptor } from "./interceptors/airports-finder.interceptor";

@NgModule()
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        FakeBackendService,
        UserService,
        AuthService,
        AuthGuard,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: FakeBackendInterceptor,
          multi: true
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AirportsFinderInterceptor,
          multi: true
        }
      ]
    };
  }
}
