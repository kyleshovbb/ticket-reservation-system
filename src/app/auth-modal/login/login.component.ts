import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { of, Subscription } from "rxjs";
import { catchError, tap } from "rxjs/operators";

import { UserService } from "src/app/core/services/user.service";

import { AuthModalService } from "../auth-modal.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.less"]
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm: FormGroup;
  public serverError: string = null;

  private subs = new Subscription();

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authModalService: AuthModalService
  ) {
    this.loginForm = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  ngOnInit(): void {
    this.subs.add(
      this.loginForm.valueChanges.subscribe(() => {
        this.serverError = null;
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
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

          return of({});
        })
      )
      .subscribe();
  }
}
