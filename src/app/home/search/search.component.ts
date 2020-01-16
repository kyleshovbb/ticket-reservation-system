import { Component, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Option } from "src/app/shared/form/form.model";

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
      value: SearchTypeValue.OneWay,
      label: "One way"
    },
    {
      value: SearchTypeValue.RoundTrip,
      label: "Round Trip"
    }
  ];

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      fromPlace: ["", Validators.required],
      toPlace: ["", Validators.required],
      depart: ["", Validators.required],
      return: [""],
      ticketCount: ["", Validators.required]
    });
  }
}
