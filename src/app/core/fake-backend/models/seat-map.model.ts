import { ReserveSeatRequest } from "../../models/seats-map.model";

export interface ReservedSeat extends ReserveSeatRequest {
  time: string;
}
