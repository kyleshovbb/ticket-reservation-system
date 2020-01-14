import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { AuthService } from "src/app/core/services/auth.service";
import { AuthModalService } from "../auth-modal.service";
import { catchError, tap } from "rxjs/operators";
import { of } from "rxjs";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.less"]
})
export class LoginComponent {
  public loginForm: FormGroup;
  public serverError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private authModalService: AuthModalService
  ) {
    this.loginForm = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  public onSubmit() {
    return this.authService
      .login(this.loginForm.value)
      .pipe(
        tap(() => {
          this.authModalService.close();
        }),
        catchError(err => {
          if (err.body && err.body.message) {
            this.serverError = err.body.message;
          }

          return of({});
        })
      )
      .subscribe();
  }
}
