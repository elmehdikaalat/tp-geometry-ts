import Point from "./Point";
import LineString from "./LineString";
import GeometryCollection from "./GeometryCollection";

export default interface GeometryVisitor<T> {
  visitPoint(point: Point): T;
  visitLineString(line: LineString): T;
  visitGeometryCollection(gc: GeometryCollection): T;
}
