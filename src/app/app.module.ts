import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";

import { CoreModule } from "./core/core.module";
import { AppComponent } from "./app.component";
import { SharedModule } from "./shared/shared.module";
import { LayoutModule } from "./modules/layout/layout.module";
import { AppRoutingModule } from "./app-routing.module";

@NgModule({
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    HttpClientModule,
    CoreModule.forRoot(),
    SharedModule.forRoot()
  ]
})
export class AppModule {}
