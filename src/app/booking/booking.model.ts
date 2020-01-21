export interface BookingTicketResponse {
  cabin_map: {
    [index: string]: string;
  };
  booking_agent: {
    clienttype: string;
    mobile: string;
    platform: string;
    is_app: boolean;
    version: string;
    revision: number;
  };
  suggestions: {};
  airlines: {
    [airlineCode: string]: string[];
  };
  itins: {
    [iden: string]: Ticket;
  };
  equipments: {
    [planeCode: string]: string;
  };
  airports: {
    [airportCode: string]: Airport;
  };
  currency: Currency;
  routings: {
    [iden: string]: Routing;
  };
  legs: {
    [iden: string]: Leg;
  };
}

interface Ticket {
  dependability_score: number;
  iden: string;
  agony: number;
  price: number;
  unrounded_price: number;
  booking_urls: {
    [iden: string]: BookingUrl;
  };
  routing_idens: string[];
  bundle_iden: string;
}

interface BookingUrl {
  original_price: number;
  kind: string;
  booking_currency: string;
  sort_rank: number;
  price: number;
  iden: string;
  url_type: string;
  unrounded_price: number;
  provider_type: string;
  name: string;
}

interface Currency {
  symbol: string;
  code: string;
  symbol_len: number;
  unicode_symbol: string;
  after: boolean;
}

interface Airport {
  city: string;
  iden: string;
  code: string;
  name: string;
  city_id: string;
  tz_name: string;
  longitude: number;
  mode: string;
  country_code: string;
  latitude: number;
  timezone: number;
  state_code: string;
  id: string;
}

interface Routing {
  iden: string;
  leg_idens: string[];
}

interface Leg {
  marketing_num: [string, number];
  wifi: boolean;
  equipment: string;
  to_code: string;
  from_code: string;
  depart_iso: string;
  arrive_iso: string;
  cabin: number;
  operating_num: [string, number];
}

export class BookingTicket {
  ticketInfo: Ticket;
  legs: Leg[];
  legInfo: Leg;
  stops: number;
  currency: Currency;
  originAirport: Airport;
  departAirport: Airport;
  duration: string;
  equipments: {
    equipment: string;
    planeCode: string;
  }[];

  constructor(response: BookingTicketResponse, ticketIden: string) {
    const ticketInfo = response.itins[ticketIden];
    const routing = this.getRoutingByIden(response, ticketInfo.routing_idens[0]);

    this.ticketInfo = ticketInfo;
    this.legs = this.getLegsByIden(response, routing.leg_idens);
    this.legInfo = this.getLegInfoByLegs(this.legs);
    this.stops = this.legs.length - 1;
    this.currency = response.currency;
    this.equipments = this.getEquipmentsByLegs(response, this.legs);
    this.originAirport = this.getAirportByCode(response, this.legInfo.from_code);
    this.departAirport = this.getAirportByCode(response, this.legInfo.to_code);
    this.duration = this.getDuration(this.legInfo.depart_iso, this.legInfo.arrive_iso);
  }

  private getRoutingByIden(response: BookingTicketResponse, routingIden: string): Routing {
    return response.routings[routingIden];
  }

  private getLegsByIden(response: BookingTicketResponse, legsIden: string[]): Leg[] {
    return legsIden.map(legIden => response.legs[legIden]);
  }

  private getLegInfoByLegs(legs: Leg[]): Leg {
    return {
      ...legs[0],
      arrive_iso: legs[legs.length - 1].arrive_iso,
      to_code: legs[legs.length - 1].to_code
    };
  }

  private getAirportByCode(response: BookingTicketResponse, airportCode: string): Airport {
    return response.airports[airportCode];
  }

  private getEquipmentsByLegs(response: BookingTicketResponse, legs: Leg[]) {
    return legs.map(leg => {
      const planeCode = this.getPlaneCodeByLeg(leg);

      return {
        planeCode,
        equipment: this.getEquipmentByPlaneCode(response, planeCode)
      };
    });
  }

  private getPlaneCodeByLeg(leg: Leg): string {
    return leg.operating_num[0] + leg.equipment;
  }

  private getEquipmentByPlaneCode(response: BookingTicketResponse, planeCode: string): string {
    return response.equipments[planeCode];
  }

  private getDuration(depart_iso: string, arrive_iso: string): string {
    const duration = new Date(arrive_iso).getTime() - new Date(depart_iso).getTime();
    const durationDate = new Date(duration);
    const durationDays = durationDate.getUTCDay() - 1;
    const durationHours = durationDate.getUTCHours() + durationDays * 24;

    return `${durationHours}h ${durationDate.getUTCMinutes()}m`;
  }
}
