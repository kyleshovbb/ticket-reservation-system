export enum RowType {
  ExitRow = "exitRow",
  FrontOfCabin = "frontOfCabin",
  Standard = "standard"
}

export enum PassDuration {
  Left = "left",
  Right = "right"
}

export enum SeatStatus {
  Occupied = "occupied",
  Available = "available"
}

type Passes = [string, string][];

interface SeatRow {
  type: RowType;
  price: number;
  seats: Seat[];
}

interface Seat {
  status: SeatStatus;
  number: string;
  passDuration?: PassDuration;
}

interface SeatsPlan {
  startRowsNumber: number;
  endRowsNumber: number;
  passes: Passes;
  letters: string[];
  exitRows: number[];
  frontOfCabinRows: number[];
}

export class PlaneSeatMap {
  public seatRows: SeatRow[];

  private get defaultSeatsPlan(): SeatsPlan {
    return {
      startRowsNumber: 5,
      endRowsNumber: 32,
      letters: ["A", "B", "C", "D", "E", "F"],
      passes: [["C", "D"]],
      exitRows: [15, 16],
      frontOfCabinRows: [5, 6, 7, 8, 9]
    };
  }

  constructor(seatsPlan?: SeatsPlan) {
    const actualPlane = seatsPlan || this.defaultSeatsPlan;
    this.seatRows = this.generateRowsByPlanePlan(actualPlane);
  }

  public occupySeat(seatNumber: string) {
    for (const row of this.seatRows) {
      for (const seat of row.seats) {
        if (seat.number === seatNumber) {
          seat.status = SeatStatus.Occupied;
        }
      }
    }
  }

  private generateRowsByPlanePlan(seatsPlan: SeatsPlan): SeatRow[] {
    const rows: SeatRow[] = [];
    const startNumber = seatsPlan.startRowsNumber;

    for (let rowNumber = startNumber; rowNumber <= seatsPlan.endRowsNumber; rowNumber++) {
      const rowType = this.getRowType(seatsPlan, rowNumber);

      rows.push(this.getRowByType(seatsPlan, rowType, rowNumber));
    }

    return rows;
  }

  private getRowType(seatsPlan: SeatsPlan, rowNumber: number): RowType {
    if (seatsPlan.exitRows.includes(rowNumber)) {
      return RowType.ExitRow;
    } else if (seatsPlan.frontOfCabinRows.includes(rowNumber)) {
      return RowType.FrontOfCabin;
    } else {
      return RowType.Standard;
    }
  }

  private getRowByType(seatsPlan: SeatsPlan, rowType: RowType, rowNumber: number): SeatRow {
    switch (rowType) {
      case RowType.Standard:
        return {
          type: RowType.Standard,
          price: 10,
          seats: this.generateSeats(seatsPlan, rowNumber)
        };

      case RowType.FrontOfCabin:
        return {
          type: RowType.FrontOfCabin,
          price: 20,
          seats: this.generateSeats(seatsPlan, rowNumber)
        };

      case RowType.ExitRow:
        return {
          type: RowType.ExitRow,
          price: 30,
          seats: this.generateSeats(seatsPlan, rowNumber)
        };
    }
  }

  private generateSeats(seatsPlan: SeatsPlan, rowNumber: number): Seat[] {
    return seatsPlan.letters.map(letter => {
      const passWithDuration = seatsPlan.passes.find(pass => pass.includes(letter));

      return {
        status: SeatStatus.Available,
        number: `${rowNumber}${letter}`,
        ...(passWithDuration
          ? {
              passDuration: this.getPassDuration(passWithDuration, letter)
            }
          : {})
      };
    });
  }

  private getPassDuration(passWithDuration: string[], letter: string) {
    return passWithDuration[0] === letter ? PassDuration.Right : PassDuration.Left;
  }
}
