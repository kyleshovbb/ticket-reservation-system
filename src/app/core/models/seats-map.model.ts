export interface SeatsMap {
  transferId: string;
  columns: Column[];
  rows: Row[];
  legends: Legends;
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

export type Legends = {
  [key in Characteristic]?: Price;
};

export interface Seat {
  number: string;
  isOccupied: boolean;
  location?: SeatLocation;
  price: Price;
  characteristic: Characteristic;
}

export interface Price {
  currency: string;
  amount: number;
}

export enum Characteristic {
  Standard = "standard",
  Front = "front",
  Exit = "exit"
}
