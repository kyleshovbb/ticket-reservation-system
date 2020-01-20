export interface Airport {
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
