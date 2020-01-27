export interface TicketsSearch {
  origin: string;
  destination: string;
  departDate: string;
  pax: string;
  returnDate?: string;
}

export enum SearchType {
  OneWay = "oneway",
  RoundTrip = "roundtrip"
}

export type Tickets = Ticket[];

export interface Ticket {
  id: string;
  price: number;
  currency: string;
  routes: TravelRoute[];
}

export interface TravelRoute {
  duration: number;
  transfers: Transfer[];
}

export interface Transfer {
  airline: string;
  planeNum: [string, number];
  departDate: string;
  arriveDate: string;
  departAirportCode: string;
  arriveAirportCode: string;
  departAirportName: string;
  arriveAirportName: string;
}
