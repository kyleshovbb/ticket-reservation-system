export enum BaggageType {
  Default = "default",
  Checked = "checked",
  SportEquipment = "sportEquipment"
}

export interface Baggage {
  type: BaggageType;
  name: string;
  description?: string;
  price: number;
  isNotStatic: boolean;
}
