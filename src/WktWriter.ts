import Geometry from "./Geometry";
import Point from "./Point";
import LineString from "./LineString";

export default class WktWriter {

  write(geometry: Geometry): string {
    if (geometry instanceof Point) {
      return this.writePoint(geometry);
    } else if (geometry instanceof LineString) {
      return this.writeLineString(geometry);
    } else {
      throw new TypeError("geometry type not supported");
    }
  }


  private formatNumber(n: number): string {
    return Number.isInteger(n) ? n.toFixed(1) : n.toString();
  }

  private writePoint(point: Point): string {
    if (point.isEmpty()) {
      return "POINT EMPTY";
    }

    const coord = point.getCoordinate();
    const x = this.formatNumber(coord[0]);
    const y = this.formatNumber(coord[1]);

    return `POINT(${x} ${y})`;
  }

  private writeLineString(ls: LineString): string {
    if (ls.isEmpty()) {
      return "LINESTRING EMPTY";
    }

    const parts: string[] = [];
    for (let i = 0; i < ls.getNumPoints(); i++) {
      const coord = ls.getPointN(i).getCoordinate();
      const x = this.formatNumber(coord[0]);
      const y = this.formatNumber(coord[1]);
      parts.push(`${x} ${y}`);
    }

    return `LINESTRING(${parts.join(",")})`;
  }
}