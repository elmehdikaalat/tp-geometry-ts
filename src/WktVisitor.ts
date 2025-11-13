import GeometryVisitor from "./GeometryVisitor";
import Point from "./Point";
import LineString from "./LineString";

export default class WktVisitor implements GeometryVisitor {

  private buffer: string = "";

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
      const parts: string[] = [];

      for (let i = 0; i < line.getNumPoints(); i++) {
        const [x, y] = line.getPointN(i).getCoordinate();
        parts.push(`${x} ${y}`);
      }

      this.buffer = `LINESTRING(${parts.join(", ")})`;
    }
  }
}