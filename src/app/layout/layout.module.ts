import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { AuthModalModule } from "../auth-modal/auth-modal.module";

import { LayoutComponent } from "./layout.component";
import { HeaderComponent } from "./header/header.component";

@NgModule({
  declarations: [LayoutComponent, HeaderComponent],
  imports: [CommonModule, AuthModalModule, RouterModule],
  exports: [LayoutComponent]
})
export class LayoutModule {}
