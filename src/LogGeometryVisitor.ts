import GeometryVisitor from "./GeometryVisitor";
import Point from "./Point";
import LineString from "./LineString";

export default class LogGeometryVisitor implements GeometryVisitor {

  visitPoint(point: Point): void {
    if (point.isEmpty()) {
      console.log("Je suis un point vide.");
    } else {
      const [x, y] = point.getCoordinate();
      console.log(`Je suis un point avec x=${x} et y=${y}.`);
    }
  }

  visitLineString(line: LineString): void {
    if (line.isEmpty()) {
      console.log("Je suis une polyligne vide.");
    } else {
      const n = line.getNumPoints();
      console.log(`Je suis une polyligne définie par ${n} point(s).`);
    }
  }
}