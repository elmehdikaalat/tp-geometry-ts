import Geometry from "./Geometry";
import Point from "./Point";

export default class LineString implements Geometry {
  private points: Point[];

  constructor(points?: Point[]) {
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

}
