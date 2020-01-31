import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { of, Observable, ReplaySubject } from "rxjs";
import { tap, catchError } from "rxjs/operators";

import { SeatsMap } from "src/app/core/models/seats-map.model";

@Injectable()
export class SeatsMapService {
  private seatsMapSubject = new ReplaySubject<SeatsMap>(1);

  public get seatsMap$() {
    return this.seatsMapSubject.asObservable();
  }

  constructor(private http: HttpClient) {}

  public loadSeatsMap(transferId: string) {
    return this.fetchSeatsMap(transferId).pipe(
      tap(seatMap => {
        this.seatsMapSubject.next(seatMap);
      }),
      catchError(() => of({}))
    );
  }

  private fetchSeatsMap(transferId: string): Observable<SeatsMap> {
    return this.http.get<SeatsMap>(`flights/seat-map/${transferId}`);
  }
}
