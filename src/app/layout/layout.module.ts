import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AuthModalModule } from "../auth-modal/auth-modal.module";
import { AppRoutingModule } from "../app-routing.module";

import { LayoutComponent } from "./layout.component";
import { HeaderComponent } from "./header/header.component";

@NgModule({
  declarations: [LayoutComponent, HeaderComponent],
  imports: [CommonModule, AuthModalModule, AppRoutingModule]
})
export class LayoutModule {}
