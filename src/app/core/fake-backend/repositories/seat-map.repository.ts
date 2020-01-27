import { random } from "faker";

import { SeatMaps, SeatMap, Column, SeatLocation, Seat, Row, Characteristic, Prices } from "../models/seat-map.model";

enum SeatMapStorageKeys {
  SeatMap = "seat-map"
}

export class SeatMapRepository {
  private _seatMaps: SeatMaps = JSON.parse(localStorage.getItem(SeatMapStorageKeys.SeatMap)) || [];

  public getOne(plane: string): SeatMap {
    const seatMap = this._seatMaps.find(seatMap => seatMap.plane === plane);
    return seatMap || this.getNewSeatMap(plane);
  }

  private getNewSeatMap(plane: string): SeatMap {
    const columns = this.getColumns();

    return {
      plane,
      columns,
      rows: this.getRows(columns),
      prices: this.getPrices()
    };
  }

  private getColumns(): Column[] {
    const columnsLength = random.number({ min: 4, max: 7 });
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const aisle = this.getAisle(columnsLength);

    return new Array(columnsLength).fill(null).map((_, index, arr) => {
      const isLastColumn = index === arr.length - 1;
      const isFirstColumn = index === 0;
      const columnNumber = index + 1;

      let location: SeatLocation;

      if (isLastColumn || isFirstColumn) {
        location = SeatLocation.Window;
      } else if (aisle.includes(columnNumber)) {
        location = SeatLocation.Aisle;
      }

      return {
        name: alphabet.charAt(index),
        ...(location ? { location } : {})
      };
    });
  }

  private getAisle(columnsLength: number): number[] {
    const leftPass = Math.floor(columnsLength / 2);
    const rightPass = leftPass + 1;
    return [leftPass, rightPass];
  }

  private getRows(columns: Column[]): Row[] {
    const rowsLength = random.number({ min: 6, max: 28 });
    const firstRowNumber = random.number({ min: 1, max: 6 });
    const wingRowLength = random.number({ min: 1, max: 6 });
    const exitRowNumbers = this.getExitRowNumbers(rowsLength, wingRowLength);

    return new Array(rowsLength).fill(null).map((_, index, arr) => {
      const rowNumber = firstRowNumber + index;
      const isWing = index <= wingRowLength;
      const isExitRow = exitRowNumbers.includes(index);
      const characteristic = this.getCharacteristic(isWing, isExitRow);

      return {
        number: rowNumber,
        isWing,
        isExitRow,
        seats: this.getSeats(columns, rowNumber, characteristic)
      };
    });
  }

  private getExitRowNumbers(rowsLength: number, wingRowLength: number): number[] {
    const exitRowCount = Math.floor(rowsLength / 10);

    return new Array(exitRowCount).fill(null).map(() => random.number({ min: wingRowLength + 1, max: rowsLength }));
  }

  private getSeats(columns: Column[], rowNumber: number, characteristic: Characteristic): Seat[] {
    return columns.map(column => ({
      number: `${rowNumber}${column.name}`,
      isOccupied: Math.random() < 0.3,
      location: column.location,
      characteristic,
      price: this.getPriceByCharacteristic(characteristic)
    }));
  }

  private getPrices(): Prices {
    return {
      [Characteristic.Standard]: this.getPriceByCharacteristic(Characteristic.Standard),
      [Characteristic.Front]: this.getPriceByCharacteristic(Characteristic.Front),
      [Characteristic.Exit]: this.getPriceByCharacteristic(Characteristic.Exit)
    };
  }

  private getPriceByCharacteristic(characteristic: Characteristic) {
    switch (characteristic) {
      case Characteristic.Standard:
        return { currency: "USD", amount: 10 };
      case Characteristic.Front:
        return { currency: "USD", amount: 20 };
      case Characteristic.Exit:
        return { currency: "USD", amount: 30 };
    }
  }

  private getCharacteristic(isWing: boolean, isExitRow: boolean) {
    if (isWing) {
      return Characteristic.Front;
    } else if (isExitRow) {
      return Characteristic.Exit;
    } else {
      return Characteristic.Standard;
    }
  }
}
