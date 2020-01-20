import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from "@angular/common/http";

import { environment } from "src/environments/environment";

@Injectable()
export class FlightDataInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const { url, method } = req;

    if (url.endsWith("prices/nearest-places-matrix") && method === "GET") {
      req = req.clone({
        url: environment.flightSearchApi + url,
        headers: new HttpHeaders({
          "x-rapidapi-host": "travelpayouts-travelpayouts-flight-data-v1.p.rapidapi.com",
          "x-rapidapi-key": "ff0f457354msh218e17c93604837p10160bjsn391ad2e535e0",
          "x-access-token": "6c5c9b9a3a1048180f89da0ff9cab702"
        })
      });
    }

    return next.handle(req);
  }
}
