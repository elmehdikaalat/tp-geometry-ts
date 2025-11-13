import Coordinate from "./Coordinate";
import Geometry from "./Geometry";

export default class Point implements Geometry {

  private coordinate: Coordinate;

  constructor(coordinate?: Coordinate) {
    this.coordinate = coordinate ?? [];
  }

  getCoordinate(): Coordinate {
    return this.coordinate;
  }

  getType(): string {
    return this.constructor.name;
  }

  isEmpty(): boolean {
    return this.coordinate.length === 0;
  }

  x(): number {
    return this.isEmpty() ? Number.NaN : this.coordinate[0];
  }

  y(): number {
    return this.isEmpty() ? Number.NaN : this.coordinate[1];
  }
}