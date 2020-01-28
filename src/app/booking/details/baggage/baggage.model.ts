export enum BaggageType {
  Default = "default",
  Checked = "checked",
  SportEquipment = "sportEquipment"
}

export interface Baggage {
  type: BaggageType;
  name: string;
  price: number;
  description: string;
  isNotStatic: boolean;
}
