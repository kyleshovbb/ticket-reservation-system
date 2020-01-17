import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from "@angular/common/http";

import { environment } from "src/environments/environment";

@Injectable()
export class AirportsFinderInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const { url, method } = req;

    if (url.endsWith("airports/by-text") && method === "GET") {
      req = req.clone({
        url: environment.airportsFinderApi + url,
        headers: new HttpHeaders({
          "x-rapidapi-host": "cometari-airportsfinder-v1.p.rapidapi.com",
          "x-rapidapi-key": "ff0f457354msh218e17c93604837p10160bjsn391ad2e535e0"
        })
      });
    }

    return next.handle(req);
  }
}
