export interface AirportResponse {
  airportId: string;
  code: string;
  name: string;
  location: { longitude: number; latitude: number };
  cityId: string;
  city: string;
  countryCode: string;
  themes: string[];
  pointsOfSale: string[];
}

export interface SearchFormValue {
  originPlace: string;
  destinationPlace: string;
  outboundDate: string;
  returnDate: string;
  adults: string | number;
}
