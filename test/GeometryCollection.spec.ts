import "mocha";
import { expect } from "chai";

import Point from "../src/Point";
import LineString from "../src/LineString";
import GeometryCollection from "../src/GeometryCollection";
import WktVisitor from "../src/WktVisitor";

describe("GeometryCollection", () => {

  it("EMPTY collection", () => {
    const gc = new GeometryCollection();

    const v = new WktVisitor();
    gc.accept(v);

    expect(v.getResult()).to.equal("GEOMETRYCOLLECTION EMPTY");
  });

  it("collection with geometries", () => {
    const p = new Point([3,4]);
    const ls = new LineString([
      new Point([0,0]),
      new Point([1,1])
    ]);

    const gc = new GeometryCollection([p, ls]);

    const v = new WktVisitor();
    gc.accept(v);

    expect(v.getResult()).to.equal(
      "GEOMETRYCOLLECTION(POINT(3 4),LINESTRING(0 0,1 1))"
    );
  });

  it("getEnvelope() for GeometryCollection", () => {
    const gc = new GeometryCollection([
      new Point([3,4]),
      new Point([-1,10]),
      new LineString([
        new Point([5,5]),
        new Point([-2,2])
      ])
    ]);

    const env = gc.getEnvelope();

    expect(env.getXmin()).to.equal(-2);
    expect(env.getYmin()).to.equal(2);
    expect(env.getXmax()).to.equal(5);
    expect(env.getYmax()).to.equal(10);
  });

  it("clone() crée une copie profonde", () => {
    const p = new Point([3, 4]);
    const ls = new LineString([new Point([1,1])]);

    const gc = new GeometryCollection([p, ls]);
    const clone = gc.clone();

    expect(clone).to.not.equal(gc);
    expect(clone.getNumGeometries()).to.equal(2);

    clone.getGeometryN(0).translate(10, 0);

    expect(gc.getGeometryN(0).asText()).to.equal("POINT(3 4)");
  });

  it("translate() translate toutes les géométries internes", () => {
    const p = new Point([3, 4]);
    const ls = new LineString([new Point([1,1])]);

    const gc = new GeometryCollection([p, ls]);
    gc.translate(10, 20);

    expect(gc.getGeometryN(0).asText()).to.equal("POINT(13 24)");
    expect(gc.getGeometryN(1).asText()).to.equal("LINESTRING(11 21)");
  });

  it("getGeometryN() retourne la bonne géométrie", () => {
    const p = new Point([3, 4]);
    const ls = new LineString([new Point([1,1])]);

    const gc = new GeometryCollection([p, ls]);

    expect(gc.getGeometryN(0)).to.equal(p);
    expect(gc.getGeometryN(1)).to.equal(ls);
  });

});