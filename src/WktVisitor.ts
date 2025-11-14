import GeometryVisitor from "./GeometryVisitor";
import Point from "./Point";
import LineString from "./LineString";
import GeometryCollection from "./GeometryCollection";

export default class WktVisitor implements GeometryVisitor<void> {
  private buffer = "";

  getResult(): string {
    return this.buffer;
  }

  visitPoint(point: Point): void {
    if (point.isEmpty()) {
      this.buffer = "POINT EMPTY";
    } else {
      const [x, y] = point.getCoordinate();
      this.buffer = `POINT(${x} ${y})`;
    }
  }

  visitLineString(line: LineString): void {
    if (line.isEmpty()) {
      this.buffer = "LINESTRING EMPTY";
    } else {
      const coords: string[] = [];
      for (let i = 0; i < line.getNumPoints(); i++) {
        const [x, y] = line.getPointN(i).getCoordinate();
        coords.push(`${x} ${y}`);
      }

      this.buffer = `LINESTRING(${coords.join(",")})`;
    }
  }

  visitGeometryCollection(gc: GeometryCollection): void {
  if (gc.isEmpty()) {
    this.buffer = "GEOMETRYCOLLECTION EMPTY";
    return;
  }

  const parts: string[] = [];

  for (let i = 0; i < gc.getNumGeometries(); i++) {
    const g = gc.getGeometryN(i);

    const subVisitor = new WktVisitor();
    g.accept(subVisitor);
    parts.push(subVisitor.getResult());
  }

  this.buffer = `GEOMETRYCOLLECTION(${parts.join(",")})`;
}
}