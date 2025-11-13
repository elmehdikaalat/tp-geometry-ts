import "mocha";
import { expect } from "chai";
import LineString from "../src/LineString";
import Point from "../src/Point";

describe("test LineString", () => {

  it("test default constructor", () => {
    const line = new LineString();
    expect(line.getNumPoints()).to.equal(0);
    expect(line.getType()).to.equal("LineString");
  });

  it("test constructor with points", () => {
    const p1 = new Point([0, 0]);
    const p2 = new Point([1, 1]);
    const line = new LineString([p1, p2]);

    expect(line.getNumPoints()).to.equal(2);
    expect(line.getPointN(0).getCoordinate()).to.deep.equal([0, 0]);
    expect(line.getPointN(1).getCoordinate()).to.deep.equal([1, 1]);
    expect(line.getType()).to.equal("LineString");
  });
});