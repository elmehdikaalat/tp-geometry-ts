import "mocha";
import { expect } from "chai";

import LengthVisitor from "../src/LengthVisitor";
import Point from "../src/Point";
import LineString from "../src/LineString";
import GeometryCollection from "../src/GeometryCollection";

describe("LengthVisitor", () => {

  it("visitPoint → 0.0", () => {
    const v = new LengthVisitor();
    const p = new Point([5, 5]);

    const result = v.visitPoint(p); 
    expect(result).to.equal(0.0);
  });

  it("visitLineString → segments simples", () => {
    const v = new LengthVisitor();

    const ls = new LineString([
      new Point([0, 0]),
      new Point([3, 4])
    ]);

    const result = v.visitLineString(ls);
    expect(result).to.equal(5);
  });

  it("visitLineString → empty line = 0", () => {
    const v = new LengthVisitor();

    const ls = new LineString();
    const result = v.visitLineString(ls);

    expect(result).to.equal(0);
  });

  it("visitGeometryCollection → somme des longueurs", () => {
    const v = new LengthVisitor();

    // 3
    const ls1 = new LineString([
      new Point([0, 0]),
      new Point([0, 3])
    ]);

    // 4
    const ls2 = new LineString([
      new Point([4, 0]),
      new Point([4, 4])
    ]);

    const gc = new GeometryCollection([
      ls1,
      ls2,
      new Point([1, 1])
    ]);

    const result = v.visitGeometryCollection(gc);
    expect(result).to.equal(7);
  });

});