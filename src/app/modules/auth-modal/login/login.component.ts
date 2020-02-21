import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { catchError, tap, first } from "rxjs/operators";

import { UserService } from "src/app/core/services/user.service";

import { AuthModalService } from "../auth-modal.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.less"]
})
export class LoginComponent {
  public loginForm: FormGroup;
  public serverError: string;

  constructor(private fb: FormBuilder, private userService: UserService, private authModalService: AuthModalService) {
    this.loginForm = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  public onSubmit() {
    return this.userService
      .login(this.loginForm.value)
      .pipe(
        tap(() => {
          this.authModalService.close();
        }),
        catchError(err => {
          if (err.body && err.body.message) {
            this.serverError = err.body.message;
          }

          return this.handleFormChanges();
        })
      )
      .subscribe();
  }

  private handleFormChanges() {
    return this.loginForm.valueChanges.pipe(
      first(),
      tap(() => {
        this.serverError = null;
      })
    );
  }
}
