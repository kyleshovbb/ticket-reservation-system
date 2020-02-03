import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { debounceTime } from "rxjs/operators";

import { Option } from "src/app/shared/models/form.model";

import { Passenger } from "../../passengers.model";

@Component({
  selector: "app-passenger-personal-information",
  templateUrl: "./personal-information.component.html",
  styleUrls: ["./personal-information.component.less"]
})
export class PersonalInformationComponent implements OnInit, OnDestroy {
  @Input() passenger: Passenger;

  public genderOptions: Option[] = [
    {
      value: "male",
      label: "Male"
    },
    {
      value: "female",
      label: "Female"
    }
  ];

  public personalInformationForm: FormGroup;

  private subs = new Subscription();

  constructor(private fb: FormBuilder) {
    this.personalInformationForm = this.fb.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      dateOfBirth: ["", Validators.required],
      gender: ["", Validators.required],
      nationality: ["", Validators.required],
      documentNumber: ["", Validators.required],
      expirationDate: ["", Validators.required]
    });
  }

  ngOnInit(): void {
    this.subs.add(this.subscribeToFormChange());
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private subscribeToFormChange() {
    return this.personalInformationForm.valueChanges.pipe(debounceTime(150)).subscribe(value => {
      this.passenger.changePersonalInformation(value);
    });
  }
}
