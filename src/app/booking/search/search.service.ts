import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

import { AirportResponse } from "./search.model";

@Injectable()
export class SearchService {
  constructor(private http: HttpClient) {}

  public fetchAirports(searchQuery: string) {
    return this.http
      .get<AirportResponse[]>("airports/by-text", {
        params: {
          text: searchQuery
        }
      })
      .pipe(map(airports => airports.slice(0, 15)));
  }
}
