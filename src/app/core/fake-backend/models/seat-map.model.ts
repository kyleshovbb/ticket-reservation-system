export type SeatMaps = SeatMap[];

export interface SeatMap {
  plane: string;
  columns: Column[];
  rows: Row[];
  prices: Prices;
}

export interface Column {
  name: string;
  location?: SeatLocation;
}

export enum SeatLocation {
  Aisle = "Aisle",
  Window = "Window"
}

export interface Row {
  number: number;
  isExitRow: boolean;
  isWing: boolean;
  seats: Seat[];
}

export type Prices = {
  [key in Characteristic]: Price;
};

export interface Seat {
  number: string;
  isOccupied: boolean;
  location?: SeatLocation;
  price: Price;
  characteristic: Characteristic;
}

interface Price {
  currency: string;
  amount: number;
}

export enum Characteristic {
  Standard = "standard",
  Front = "front",
  Exit = "exit"
}
