import GeometryVisitor from "./GeometryVisitor";
import Point from "./Point";
import LineString from "./LineString";

export default class LogGeometryVisitor implements GeometryVisitor {

  constructor(private log = console.log) {}

  visitPoint(point: Point): void {
    if (point.isEmpty()) {
      this.log("Je suis un point vide.");
    } else {
      const [x, y] = point.getCoordinate();
      this.log(`Je suis un point avec x=${x} et y=${y}.`);
    }
  }

  visitLineString(line: LineString): void {
    if (line.isEmpty()) {
      this.log("Je suis une polyligne vide.");
    } else {
      const n = line.getNumPoints();
      this.log(`Je suis une polyligne définie par ${n} point(s).`);
    }
  }
}