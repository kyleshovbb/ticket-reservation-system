import { address, date, hacker, random, finance } from "faker";

import { Tickets, Ticket, Transfer, TicketsSearch, TravelRoute } from "src/app/core/models/tickets.model";

import airports from "../data/airports.data";

enum TicketsStorageKeys {
  Tickets = "tickets"
}

export class TicketsRepository {
  private _tickets: Tickets = JSON.parse(localStorage.getItem(TicketsStorageKeys.Tickets)) || [];

  public getAll(): Tickets {
    return this._tickets.slice();
  }

  public getOne(id: string): Ticket {
    return this._tickets.find(ticket => ticket.id === id);
  }

  public generateTickets(search: TicketsSearch) {
    const randomTicketsCount = random.number({ min: 1, max: 10 });

    this._tickets = new Array(randomTicketsCount).fill(null).map(() => this.getTicket(search));
    localStorage.setItem(TicketsStorageKeys.Tickets, JSON.stringify(this._tickets));
  }

  private getTicket(search: TicketsSearch): Ticket {
    return {
      id: random.uuid(),
      price: Number(finance.amount(20, 2000)),
      adult: Number(search.pax),
      currency: "USD",
      routes: this.getRoutes(search)
    };
  }

  private getRoutes(search: TicketsSearch) {
    const isRoundTrip = !!search.returnDate;

    if (isRoundTrip) {
      return new Array(2).fill(null).map((_, index) => this.getRoute(search, index));
    } else {
      return new Array(1).fill(null).map((_, index) => this.getRoute(search, index));
    }
  }

  private getRoute(search: TicketsSearch, index: number): TravelRoute {
    const isRoundTrip = index === 0;
    const transfers = isRoundTrip ? this.getRoundTripTransfers(search) : this.getOneWayTransfers(search);
    const lastTransfer = transfers[transfers.length - 1];
    const firstTransfer = transfers[0];
    const duration = new Date(lastTransfer.arriveDate).getTime() - new Date(firstTransfer.departDate).getTime();

    return {
      duration,
      transfers
    };
  }

  private getOneWayTransfers(search: TicketsSearch): Transfer[] {
    const randomTransferCount = random.number({ min: 1, max: 3 });

    return new Array(randomTransferCount).fill(null).map((_value, index) => {
      const isFirstRoute = index === 0;
      const isLastRoute = index + 1 === randomTransferCount;
      const returnDate = search.returnDate || this.getDateAfterTenDays(search.departDate);
      const departDate = date.between(search.departDate, returnDate).toISOString();
      const [code, airlineName] = this.getRandomAirline();

      return {
        airline: airlineName,
        planeNum: [code, random.number({ min: 1000, max: 9999 })],
        departDate,
        arriveDate: date.between(departDate, returnDate).toISOString(),
        departAirportCode: isFirstRoute ? search.origin : hacker.abbreviation(),
        arriveAirportCode: isLastRoute ? search.destination : hacker.abbreviation(),
        departAirportName: address.city(),
        arriveAirportName: address.city()
      };
    });
  }

  private getRoundTripTransfers(search: TicketsSearch): Transfer[] {
    const randomTransferCount = random.number({ min: 1, max: 3 });

    return new Array(randomTransferCount).fill(null).map((_value, index) => {
      const isFirstRoute = index === 0;
      const isLastRoute = index + 1 === randomTransferCount;
      const returnDate = search.returnDate || this.getDateAfterTenDays(search.departDate);
      const departDate = date.between(search.departDate, returnDate).toISOString();
      const [code, airlineName] = this.getRandomAirline();

      return {
        airline: airlineName,
        planeNum: [code, random.number({ min: 1000, max: 9999 })],
        departDate,
        arriveDate: date.between(departDate, returnDate).toISOString(),
        departAirportCode: isFirstRoute ? search.destination : hacker.abbreviation(),
        arriveAirportCode: isLastRoute ? search.origin : hacker.abbreviation(),
        departAirportName: address.city(),
        arriveAirportName: address.city()
      };
    });
  }

  private getRandomAirline(): [string, string] {
    const airlinesEntries = Object.entries(airports);
    const randomAirlineIndex = random.number({ min: 0, max: airlinesEntries.length - 1 });
    return airlinesEntries[randomAirlineIndex];
  }

  private getDateAfterTenDays(startDate: string): string {
    let date = new Date(startDate);
    date.setDate(date.getDate() + 10);
    return date.toISOString();
  }
}
