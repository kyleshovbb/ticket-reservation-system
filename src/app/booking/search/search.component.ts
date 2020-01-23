import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Component, OnInit, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy } from "@angular/core";
import { Subscription, pipe } from "rxjs";
import { debounceTime, distinctUntilChanged, mergeMap, map } from "rxjs/operators";

import { Option } from "src/app/shared/models/form.model";

import { SearchType } from "../booking.model";
import { SearchService } from "./search.service";
import { BookingService } from "../booking.service";
import { AirportResponse } from "./search.model";

@Component({
  selector: "app-booking-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit, OnDestroy {
  public searchForm: FormGroup;
  public searchTypeOptions: Option[] = [
    {
      value: SearchType.RoundTrip,
      label: "Round Trip"
    },
    {
      value: SearchType.OneWay,
      label: "One way"
    }
  ];

  private subs = new Subscription();

  private _searchTypeValue = SearchType.RoundTrip;
  private _fromAirportOptions: Option[] = [];
  private _toAirportOptions: Option[] = [];

  public get searchTypeValue() {
    return this._searchTypeValue;
  }

  public set searchTypeValue(searchType: SearchType) {
    this._searchTypeValue = searchType;

    if (searchType === SearchType.OneWay) {
      console.log(searchType);
      this.searchForm.controls["returnDate"].reset();
    }

    this.cdr.markForCheck();
  }

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
    return this.searchTypeValue === SearchType.OneWay;
  }

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private homeService: BookingService,
    private searchService: SearchService
  ) {
    this.searchForm = this.fb.group({
      originPlace: ["", Validators.required],
      destinationPlace: ["", Validators.required],
      outboundDate: ["", Validators.required],
      returnDate: [""],
      adults: ["", Validators.required]
    });
  }

  ngOnInit(): void {
    this.subs.add(this.handleOriginPlaceValueChanges()).add(this.handleDestinationPlaceValueChanges());
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  public onSubmit() {
    this.homeService.loadTicketsList(this.searchForm.value).subscribe();
  }

  private handleOriginPlaceValueChanges() {
    return this.searchForm.controls["originPlace"].valueChanges
      .pipe(this.fetchAirportsOptionsPipe())
      .subscribe(options => {
        this.fromAirportOptions = options;
      });
  }

  private handleDestinationPlaceValueChanges() {
    return this.searchForm.controls["destinationPlace"].valueChanges
      .pipe(this.fetchAirportsOptionsPipe())
      .subscribe(options => {
        this.toAirportOptions = options;
      });
  }

  private fetchAirportsOptionsPipe() {
    return pipe(
      debounceTime(150),
      distinctUntilChanged(),
      mergeMap((value: string) => this.searchService.fetchAirports(value)),
      map(airports => this.parseAirportsToOptions(airports))
    );
  }

  private parseAirportsToOptions(airports: AirportResponse[]): Option[] {
    return airports.map(airport => ({
      label: `${airport.name} (${airport.code})`,
      value: airport.code
    }));
  }
}
