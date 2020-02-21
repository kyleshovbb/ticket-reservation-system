import { Component, ChangeDetectionStrategy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { AuthApiService } from "src/app/core/services/auth-api.service";

import { AuthModalService } from "../auth-modal.service";

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationComponent {
  public registrationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthApiService,
    private authModalService: AuthModalService
  ) {
    this.registrationForm = this.fb.group({
      username: ["", Validators.required],
      email: ["", Validators.compose([Validators.required, Validators.email])],
      password: ["", Validators.required]
    });
  }

  public onSubmit() {
    return this.authService.register(this.registrationForm.value).subscribe(() => {
      this.authModalService.close();
    });
  }
}
