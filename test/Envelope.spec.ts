import "mocha";
import { expect } from "chai";
import Envelope from "../src/Envelope";
import EnvelopeBuilder from "../src/EnvelopeBuilder";
import Point from "../src/Point";
import LineString from "../src/LineString";

describe("test Envelope & EnvelopeBuilder", () => {

  it("Envelope vide", () => {
    const e = new Envelope();

    expect(e.isEmpty()).to.equal(true);
    expect(Number.isNaN(e.getXmin())).to.equal(true);
    expect(Number.isNaN(e.getYmin())).to.equal(true);
    expect(Number.isNaN(e.getXmax())).to.equal(true);
    expect(Number.isNaN(e.getYmax())).to.equal(true);
    expect(e.toString()).to.equal("EMPTY");
  });

  it("EnvelopeBuilder vide : Envelope vide", () => {
    const builder = new EnvelopeBuilder();
    const e = builder.build();

    expect(e.isEmpty()).to.equal(true);
  });

  it("EnvelopeBuilder avec un seul point", () => {
    const builder = new EnvelopeBuilder();
    builder.insert([2.0, 3.0]);
    const e = builder.build();

    expect(e.isEmpty()).to.equal(false);
    expect(e.getXmin()).to.equal(2.0);
    expect(e.getYmin()).to.equal(3.0);
    expect(e.getXmax()).to.equal(2.0);
    expect(e.getYmax()).to.equal(3.0);
  });

  it("EnvelopeBuilder avec plusieurs points", () => {
    const builder = new EnvelopeBuilder();

    builder.insert([0.0, 1.0]);
    builder.insert([2.0, 0.0]);
    builder.insert([1.0, 3.0]);

    const e = builder.build();

    expect(e.isEmpty()).to.equal(false);
    expect(e.getXmin()).to.equal(0.0);
    expect(e.getYmin()).to.equal(0.0);
    expect(e.getXmax()).to.equal(2.0);
    expect(e.getYmax()).to.equal(3.0);
  });

  it("Envelope.toString() format", () => {
    const builder = new EnvelopeBuilder();
    builder.insert([1, 2]);
    builder.insert([4, 6]);
  
    const e = builder.build();
    expect(e.toString()).to.equal("[1,2] - [4,6]");
  });
  
  it("EnvelopeBuilder ignore les coordonnées vides", () => {
    const builder = new EnvelopeBuilder();

    builder.insert([]); 
    builder.insert([1, 2]);

    const e = builder.build();

    expect(e.getXmin()).to.equal(1);
    expect(e.getYmin()).to.equal(2);
    expect(e.getXmax()).to.equal(1);
    expect(e.getYmax()).to.equal(2);
  });

});

describe("EnvelopeBuilder as GeometryVisitor", () => {

  it("visitPoint() ajoute les coordonnées", () => {
    const builder = new EnvelopeBuilder();
    const p = new Point([3, 4]);

    builder.visitPoint(p);
    const e = builder.build();

    expect(e.isEmpty()).to.equal(false);
    expect(e.getXmin()).to.equal(3);
    expect(e.getYmin()).to.equal(4);
    expect(e.getXmax()).to.equal(3);
    expect(e.getYmax()).to.equal(4);
  });

  it("visitLineString() parcourt tous les points", () => {
    const p1 = new Point([0, 10]);
    const p2 = new Point([5, -3]);
    const p3 = new Point([2, 4]);
    const ls = new LineString([p1, p2, p3]);

    const builder = new EnvelopeBuilder();
    builder.visitLineString(ls);

    const e = builder.build();

    expect(e.isEmpty()).to.equal(false);
    expect(e.getXmin()).to.equal(0);
    expect(e.getYmin()).to.equal(-3);
    expect(e.getXmax()).to.equal(5);
    expect(e.getYmax()).to.equal(10);
  });

  it("getEnvelope() sur Point utilise EnvelopeBuilder + accept()", () => {
    const p = new Point([7, 9]);
    const env = p.getEnvelope();

    expect(env.isEmpty()).to.equal(false);
    expect(env.getXmin()).to.equal(7);
    expect(env.getYmin()).to.equal(9);
    expect(env.getXmax()).to.equal(7);
    expect(env.getYmax()).to.equal(9);
  });

  it("getEnvelope() sur LineString utilise EnvelopeBuilder + accept()", () => {
    const ls = new LineString([
      new Point([1, 1]),
      new Point([-2, 5]),
      new Point([4, 0])
    ]);

    const env = ls.getEnvelope();

    expect(env.isEmpty()).to.equal(false);
    expect(env.getXmin()).to.equal(-2);
    expect(env.getYmin()).to.equal(0);
    expect(env.getXmax()).to.equal(4);
    expect(env.getYmax()).to.equal(5);
  });

});