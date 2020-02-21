import { Injectable } from "@angular/core";
import { ReplaySubject, BehaviorSubject } from "rxjs";

import { AuthModalType } from "src/app/core/models/auth-modal.model";

@Injectable()
export class AuthModalService {
  private isOpenSubject = new ReplaySubject<boolean>(1);
  private authModalTypeSubject = new BehaviorSubject(AuthModalType.Login);

  public get isOpen$() {
    return this.isOpenSubject.asObservable();
  }

  public get authModalType$() {
    return this.authModalTypeSubject.asObservable();
  }

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
