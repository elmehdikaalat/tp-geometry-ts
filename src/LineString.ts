import AbstractGeometry from "./AbstractGeometry";
import Envelope from "./Envelope";
import EnvelopeBuilder from "./EnvelopeBuilder";
import Geometry from "./Geometry";
import GeometryVisitor from "./GeometryVisitor";
import Point from "./Point";

export default class LineString extends AbstractGeometry{
  private points: Point[];

  constructor(points?: Point[]) {
    super();
    this.points = points ?? [];
  }

  getNumPoints(): number {
    return this.points.length;
  }

  getPointN(n: number): Point {
    return this.points[n];
  }

  getType(): string {
    return this.constructor.name;
  }
  isEmpty(): boolean {
    return this.points.length === 0;
  }
  translate(dx: number, dy: number): void {
    if (this.isEmpty()) return;

    for (const p of this.points) {
        p.translate(dx, dy);
    }
  }
  clone(): LineString {
    const clonedPoints = this.points.map(p => p.clone());
    return new LineString(clonedPoints);
  }

  getEnvelope(): Envelope {
    const builder = new EnvelopeBuilder();

    for (const p of this.points) {
      if (!p.isEmpty()) {
        builder.insert(p.getCoordinate());
      }
    }

    return builder.build();
  }

  accept(visitor: GeometryVisitor): void {
    visitor.visitLineString(this);
  }

}
