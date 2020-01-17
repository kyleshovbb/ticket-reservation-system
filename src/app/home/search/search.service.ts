import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { from } from "rxjs";
import { mergeMap, take, toArray } from "rxjs/operators";

import { Airport } from "./search.model";

@Injectable()
export class SearchService {
  constructor(private http: HttpClient) {}

  public fetchAirports(searchQuery: string) {
    return this.http
      .get<Airport[]>("airports/by-text", {
        params: {
          text: searchQuery
        }
      })
      .pipe(
        mergeMap(airports => from(airports)),
        take(15),
        toArray()
      );
  }
}
