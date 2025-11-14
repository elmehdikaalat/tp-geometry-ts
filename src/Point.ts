import AbstractGeometry from "./AbstractGeometry";
import Coordinate from "./Coordinate";
import Envelope from "./Envelope";
import EnvelopeBuilder from "./EnvelopeBuilder";
import Geometry from "./Geometry";
import GeometryVisitor from "./GeometryVisitor";

export default class Point extends AbstractGeometry {

  private coordinate: Coordinate;

  constructor(coordinate?: Coordinate) {
    super();
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

  translate(dx: number, dy: number): void {
    if (this.isEmpty()) return;

    this.coordinate[0] += dx;
    this.coordinate[1] += dy;
  }
  clone(): Point {
    const newCoord = this.coordinate.slice();  
    return new Point(newCoord);
  }
  getEnvelope(): Envelope {
    const builder = new EnvelopeBuilder();

    if (!this.isEmpty()) {
      builder.insert(this.coordinate);
    }

    return builder.build();
  }
  accept(visitor: GeometryVisitor): void {
    visitor.visitPoint(this);
  }
}