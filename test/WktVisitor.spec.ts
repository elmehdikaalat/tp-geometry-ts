import "mocha";
import { expect } from "chai";
import WktVisitor from "../src/WktVisitor";
import Point from "../src/Point";
import LineString from "../src/LineString";

describe("test WktVisitor", () => {

  it("POINT EMPTY", () => {
    const visitor = new WktVisitor();
    new Point().accept(visitor);
    expect(visitor.getResult()).to.equal("POINT EMPTY");
  });

  it("POINT(x y)", () => {
    const visitor = new WktVisitor();
    new Point([3.0, 4.0]).accept(visitor);
    expect(visitor.getResult()).to.equal("POINT(3 4)");
  });

  it("LINESTRING EMPTY", () => {
    const visitor = new WktVisitor();
    new LineString().accept(visitor);
    expect(visitor.getResult()).to.equal("LINESTRING EMPTY");
  });

  it("LINESTRING(x1 y1, x2 y2, ...)", () => {
    const visitor = new WktVisitor();

    const ls = new LineString([
      new Point([0.0, 0.0]),
      new Point([1.0, 1.5]),
      new Point([5.0, 5.0])
    ]);

    ls.accept(visitor);

    expect(visitor.getResult()).to.equal(
      "LINESTRING(0 0, 1 1.5, 5 5)"
    );
  });

});
