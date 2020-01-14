import { Injectable } from "@angular/core";
import { ValidationErrors } from "@angular/forms";

@Injectable()
export class ValidatorService {
  public getErrorsTipFromValidators(validationErrors: ValidationErrors) {
    if (!validationErrors) {
      return "";
    }

    return Object.keys(validationErrors).reduce((error, errorKey, index) => {
      if (index === 0) {
        return this.getErrorTipFromValidator(errorKey);
      }

      return `${this.getErrorTipFromValidator(errorKey)}, ${error}`;
    }, "");
  }

  private getErrorTipFromValidator(errorKey: string) {
    switch (errorKey) {
      case "email":
        return "Email is not valid";
      case "required":
        return "Field is required";
      default:
        return "Field is not valid";
    }
  }
}
