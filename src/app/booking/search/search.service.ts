import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

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
      .pipe(map(airports => airports.slice(15)));
  }
}
