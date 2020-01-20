export interface TicketInfo {
  value: number;
  trip_class: number;
  show_to_affiliates: boolean;
  return_date: string;
  origin: string;
  number_of_changes: number;
  gate: string;
  found_at: string;
  distance: number;
  destination: string;
  depart_date: string;
  actual: boolean;
}

export interface BookingTicketResponse {
  success: boolean;
  data: TicketInfo[];
}
