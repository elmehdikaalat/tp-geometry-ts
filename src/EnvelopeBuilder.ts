import Coordinate from "./Coordinate";
import Envelope from "./Envelope";

export default class EnvelopeBuilder {
  private xmin: number | undefined = undefined;
  private ymin: number | undefined = undefined;
  private xmax: number | undefined = undefined;
  private ymax: number | undefined = undefined;

  insert(coordinate: Coordinate): void {
    if (coordinate.length === 0) {
      return;
    }

    const x = coordinate[0];
    const y = coordinate[1];

    if (this.xmin === undefined || x < this.xmin) this.xmin = x;
    if (this.ymin === undefined || y < this.ymin) this.ymin = y;
    if (this.xmax === undefined || x > this.xmax) this.xmax = x;
    if (this.ymax === undefined || y > this.ymax) this.ymax = y;
  }

  build(): Envelope {
    if (
      this.xmin === undefined ||
      this.ymin === undefined ||
      this.xmax === undefined ||
      this.ymax === undefined
    ) {
      return new Envelope();
    }

    return new Envelope(
      [this.xmin, this.ymin],
      [this.xmax, this.ymax]
    );
  }
}