import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Component, ViewEncapsulation, OnInit, OnDestroy, ChangeDetectorRef } from "@angular/core";
import { Subscription } from "rxjs";
import { tap, mergeMap, debounceTime, distinctUntilChanged, map } from "rxjs/operators";

import { Option } from "src/app/shared/models/form.model";

import { Airport } from "./search.model";
import { HomeService } from "../home.service";
import { SearchService } from "./search.service";

enum SearchTypeValue {
  OneWay = "one-way",
  RoundTrip = "round-trip"
}

@Component({
  selector: "app-home-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.less"],
  encapsulation: ViewEncapsulation.None,
  providers: [SearchService]
})
export class SearchComponent implements OnInit, OnDestroy {
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

  private subs = new Subscription();

  private _fromAirportOptions: Option[] = [];
  private _toAirportOptions: Option[] = [];

  public get fromAirportOptions() {
    return this._fromAirportOptions;
  }

  public set fromAirportOptions(options: Option[]) {
    this._fromAirportOptions = options;
    this.cdr.markForCheck();
  }

  public get toAirportOptions() {
    return this._toAirportOptions;
  }

  public set toAirportOptions(options: Option[]) {
    this._toAirportOptions = options;
    this.cdr.markForCheck();
  }

  public get roundTripDateIsDisabled() {
    return this.searchTypeValue === SearchTypeValue.OneWay;
  }

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private homeService: HomeService,
    private searchService: SearchService
  ) {
    this.searchForm = this.fb.group({
      fromPlace: ["", Validators.required],
      toPlace: ["", Validators.required],
      depart: ["", Validators.required],
      return: [""],
      ticketCount: ["", Validators.required]
    });
  }

  ngOnInit(): void {
    this.subs.add(this.handleFromPlaceValueChanges()).add(this.handleToPlaceValueChanges());
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  public onSubmit() {
    this.homeService.loadTickets(this.searchForm.value).subscribe();
  }

  private handleFromPlaceValueChanges() {
    return this.searchForm.controls["fromPlace"].valueChanges
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        mergeMap(value => this.searchService.fetchAirports(value)),
        map(airports => this.parseAirportsToOptions(airports)),
        tap(options => {
          this.fromAirportOptions = options;
        })
      )
      .subscribe();
  }

  private handleToPlaceValueChanges() {
    return this.searchForm.controls["toPlace"].valueChanges
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        mergeMap(value => this.searchService.fetchAirports(value)),
        map(airports => this.parseAirportsToOptions(airports)),
        tap(options => {
          this.toAirportOptions = options;
        })
      )
      .subscribe();
  }

  private parseAirportsToOptions(airports: Airport[]): Option[] {
    return airports.map(airport => ({
      label: `${airport.name} (${airport.code})`,
      value: `${airport.name} (${airport.code})`
    }));
  }
}
