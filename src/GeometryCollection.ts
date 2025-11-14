import AbstractGeometry from "./AbstractGeometry";
import Geometry from "./Geometry";
import GeometryVisitor from "./GeometryVisitor";
import Envelope from "./Envelope";

export default class GeometryCollection extends AbstractGeometry {

  private geometries: Geometry[];

  constructor(geometries?: Geometry[]) {
    super();
    this.geometries = geometries ?? [];
  }

  getNumGeometries(): number {
    return this.geometries.length;
  }

  getGeometryN(n: number): Geometry {
    return this.geometries[n];
  }

  getType(): string {
    return "GeometryCollection";
  }

  isEmpty(): boolean {
    return this.geometries.length === 0;
  }

  translate(dx: number, dy: number): void {
    for (const g of this.geometries) {
      g.translate(dx, dy);
    }
  }

  clone(): GeometryCollection {
    return new GeometryCollection(this.geometries.map(g => g.clone()));
  }

  accept(visitor: GeometryVisitor): void {
    visitor.visitGeometryCollection(this);
  }
}