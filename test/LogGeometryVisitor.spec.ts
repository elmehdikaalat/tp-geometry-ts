import "mocha";
import { expect } from "chai";
import LogGeometryVisitor from "../src/LogGeometryVisitor";
import Point from "../src/Point";
import LineString from "../src/LineString";

describe("test LogGeometryVisitor", () => {

  function captureLogs(test: () => void): string[] {
    const logs: string[] = [];
    const old = console.log;
    console.log = (msg: any) => logs.push(msg);
    test();
    console.log = old;
    return logs;
  }

  it("point vide", () => {
    const logs = captureLogs(() => {
      const v = new LogGeometryVisitor();
      new Point().accept(v);
    });
    expect(logs[0]).to.equal("Je suis un point vide.");
  });

  it("point non vide", () => {
    const logs = captureLogs(() => {
      const v = new LogGeometryVisitor();
      new Point([2.0, 3.0]).accept(v);
    });
    expect(logs[0]).to.equal("Je suis un point avec x=2 et y=3.");
  });

  it("linestring vide", () => {
    const logs = captureLogs(() => {
      const v = new LogGeometryVisitor();
      new LineString().accept(v);
    });
    expect(logs[0]).to.equal("Je suis une polyligne vide.");
  });

  it("linestring non vide", () => {
    const logs = captureLogs(() => {
      const v = new LogGeometryVisitor();
      const ls = new LineString([
        new Point([0, 0]),
        new Point([1, 1]),
        new Point([3, 3])
      ]);
      ls.accept(v);
    });
    expect(logs[0]).to.equal("Je suis une polyligne définie par 3 point(s).");
  });

});