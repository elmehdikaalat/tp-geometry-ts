import "mocha";
import { expect } from "chai";
import LineString from "../src/LineString";
import Point from "../src/Point";

describe("test LineString", () => {

  it("test default constructor", () => {
    const line = new LineString();

    expect(line.getNumPoints()).to.equal(0);
    expect(line.isEmpty()).to.equal(true);
    expect(line.getType()).to.equal("LineString");
  });

  it("test constructor with points", () => {
    const p1 = new Point([0, 0]);
    const p2 = new Point([1, 1]);
    const line = new LineString([p1, p2]);

    expect(line.getNumPoints()).to.equal(2);
    expect(line.isEmpty()).to.equal(false);

    expect(line.getPointN(0).getCoordinate()).to.deep.equal([0, 0]);
    expect(line.getPointN(1).getCoordinate()).to.deep.equal([1, 1]);
    expect(line.getType()).to.equal("LineString");
  });

  it("test translate", () => {
    const p1 = new Point([0, 0]);
    const p2 = new Point([10, 20]);
    const line = new LineString([p1, p2]);

    line.translate(2, -3);

    expect(line.getPointN(0).getCoordinate()).to.deep.equal([2, -3]);
    expect(line.getPointN(1).getCoordinate()).to.deep.equal([12, 17]);
  });

  it("test translate on empty LineString", () => {
    const line = new LineString();

    line.translate(5, 5);

    expect(line.getNumPoints()).to.equal(0);
    expect(line.isEmpty()).to.equal(true);
  });

});