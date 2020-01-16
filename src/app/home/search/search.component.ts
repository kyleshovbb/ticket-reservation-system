import { Component, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Option } from "src/app/shared/form/form.model";

import { HomeService } from "../home.service";

enum SearchTypeValue {
  OneWay = "one-way",
  RoundTrip = "round-trip"
}

@Component({
  selector: "app-home-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.less"],
  encapsulation: ViewEncapsulation.None
})
export class SearchComponent {
  public searchForm: FormGroup;
  public searchTypeValue = SearchTypeValue.RoundTrip;
  public searchTypeOptions: Option[] = [
    {
      value: SearchTypeValue.RoundTrip,
      label: "Round Trip"
    },
    {
      value: SearchTypeValue.OneWay,
      label: "One way"
    }
  ];

  constructor(private fb: FormBuilder, private homeService: HomeService) {
    this.searchForm = this.fb.group({
      fromPlace: ["", Validators.required],
      toPlace: ["", Validators.required],
      depart: ["", Validators.required],
      return: [""],
      ticketCount: ["", Validators.required]
    });
  }

  public get roundTripDateIsDisabled() {
    return this.searchTypeValue === SearchTypeValue.OneWay;
  }

  public onSubmit() {
    this.homeService.loadTickets(this.searchForm.value);
  }
}
