import "mocha";
import { expect } from "chai";
import Point from "../src/Point";
import LineString from "../src/LineString";
import WktWriter from "../src/WktWriter";

describe("test WktWriter", () => {

  it("POINT EMPTY", () => {
    const g = new Point();
    const writer = new WktWriter();

    const wkt = writer.write(g);
    expect(wkt).to.equal("POINT EMPTY");
  });

  it("POINT(x y)", () => {
    const g = new Point([3.0, 4.0]);
    const writer = new WktWriter();

    const wkt = writer.write(g);
    expect(wkt).to.equal("POINT(3.0 4.0)");
  });

  it("LINESTRING EMPTY", () => {
    const g = new LineString();
    const writer = new WktWriter();

    const wkt = writer.write(g);
    expect(wkt).to.equal("LINESTRING EMPTY");
  });

  it("LINESTRING(x1 y1, x2 y2, ...)", () => {
    const p1 = new Point([0.0, 0.0]);
    const p2 = new Point([1.0, 1.5]);
    const p3 = new Point([5.0, 5.0]);
    const g = new LineString([p1, p2, p3]);

    const writer = new WktWriter();
    const wkt = writer.write(g);

    expect(wkt).to.equal("LINESTRING(0.0 0.0,1.0 1.5,5.0 5.0)");
  });


});