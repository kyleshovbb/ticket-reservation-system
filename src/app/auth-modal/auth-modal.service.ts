import { Injectable } from "@angular/core";
import { ReplaySubject, BehaviorSubject } from "rxjs";

import { AuthModalType } from "./auth-modal.model";

@Injectable()
export class AuthModalService {
  private isOpenSubject = new ReplaySubject<boolean>(1);
  public isOpen$ = this.isOpenSubject.asObservable();

  private authModalTypeSubject = new BehaviorSubject<AuthModalType>("login");
  public authModalType$ = this.authModalTypeSubject.asObservable();

  public open(authType: AuthModalType) {
    this.isOpenSubject.next(true);
    this.changeAuthType(authType);
  }

  public close() {
    this.isOpenSubject.next(false);
  }

  public changeAuthType(authType: AuthModalType) {
    this.authModalTypeSubject.next(authType);
  }
}
