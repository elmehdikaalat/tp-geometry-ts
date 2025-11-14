import "mocha";
import { expect } from "chai";
import LogGeometryVisitor from "../src/LogGeometryVisitor";
import Point from "../src/Point";
import LineString from "../src/LineString";
import GeometryCollection from "../src/GeometryCollection";

describe("test LogGeometryVisitor", () => {

  it("point vide", () => {
    let message = "";
    const visitor = new LogGeometryVisitor((msg) => message = msg);

    const g = new Point();
    g.accept(visitor);

    expect(message).to.equal("Je suis un point vide.");
  });

  it("point non vide", () => {
    let message = "";
    const visitor = new LogGeometryVisitor((msg) => message = msg);

    const g = new Point([2.0, 3.0]);
    g.accept(visitor);

    expect(message).to.equal("Je suis un point avec x=2 et y=3.");
  });

  it("linestring vide", () => {
    let message = "";
    const visitor = new LogGeometryVisitor((msg) => message = msg);

    const g = new LineString();
    g.accept(visitor);

    expect(message).to.equal("Je suis une polyligne vide.");
  });

  it("linestring non vide", () => {
    let message = "";
    const visitor = new LogGeometryVisitor((msg) => message = msg);

    const g = new LineString([
      new Point([0, 0]),
      new Point([1, 1]),
      new Point([3, 3])
    ]);

    g.accept(visitor);

    expect(message).to.equal("Je suis une polyligne définie par 3 point(s).");
  });

  it("utilise console.log par défaut", () => {
  let msg = "";

  const old = console.log;
  console.log = (m: any) => msg = m;

  const visitor = new LogGeometryVisitor();
  new Point().accept(visitor);

  console.log = old;

  expect(msg).to.equal("Je suis un point vide.");
});

it("geometry collection vide", () => {
  let message = "";
  const visitor = new LogGeometryVisitor((msg) => message = msg);

  const gc = new GeometryCollection();
  gc.accept(visitor);

  expect(message).to.equal("Je suis une collection vide.");
});

it("geometry collection non vide", () => {
  let message = "";
  const visitor = new LogGeometryVisitor((msg) => message = msg);

  const gc = new GeometryCollection([
    new Point([1, 2]),
    new LineString([new Point([0, 0])])
  ]);

  gc.accept(visitor);

  expect(message).to.equal("Je suis une collection contenant 2 géométrie(s).");
});


});