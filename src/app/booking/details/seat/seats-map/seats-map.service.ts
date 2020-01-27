import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { of, Observable, ReplaySubject } from "rxjs";
import { tap, catchError } from "rxjs/operators";

import { SeatMap } from "src/app/core/fake-backend/models/seat-map.model";

@Injectable()
export class SeatsMapService {
  private seatsMapSubject = new ReplaySubject<SeatMap>(1);

  get seatsMap$() {
    return this.seatsMapSubject.asObservable();
  }

  constructor(private http: HttpClient) {}

  public loadSeatsMap(plane: string) {
    return this.fetchSeatsMap(plane).pipe(
      tap(seatMap => {
        this.seatsMapSubject.next(seatMap);
      }),
      catchError(() => of({}))
    );
  }

  private fetchSeatsMap(plane: string): Observable<SeatMap> {
    return this.http.get<SeatMap>(`flights/seat-map/${plane}`);
  }
}
