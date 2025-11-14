import "mocha";
import { expect } from "chai";
import GeometryWithCachedEnvelope from "../src/GeometryWithCachedEnvelope";
import Point from "../src/Point";
import LineString from "../src/LineString";

describe("test GeometryWithCachedEnvelope", () => {

    it("met en cache le resultat de getEnveloppe()", () => {
        const p = new Point([3,4]);
        const g = new GeometryWithCachedEnvelope(p);

        const env1 = g.getEnvelope();
        const env2 = g.getEnvelope();

        expect(env1).to.equal(env2);
    });

    it("invalide le cache lors de la translation", () => {
        const p = new Point([3,4]);
        const g = new GeometryWithCachedEnvelope(p);

        const env1 = g.getEnvelope();
        g.translate(10, 0);
        const env2 = g.getEnvelope();

        expect(env1).to.not.equal(env2);
        expect(env2.getXmin()).to.equal(13);
        expect(env2.getYmin()).to.equal(4);
    });

    it("fonctionne aussi avec LineString", () => {
        const ls = new LineString([
            new Point([10,20]),
            new Point([0,0])
        ]);

        const g = new GeometryWithCachedEnvelope(ls);

        const env1 = g.getEnvelope();
        const env2 = g.getEnvelope();

        expect(env1).to.equal(env2);
        expect(env1.getXmin()).to.equal(0);
        expect(env1.getYmin()).to.equal(0);
        expect(env1.getXmax()).to.equal(10);
        expect(env1.getYmax()).to.equal(20);
    });

    it("delegue getType() à la geometry originale", () => {
        const p = new Point([1,2]);
        const g = new GeometryWithCachedEnvelope(p);

        expect(g.getType()).to.equal("Point");
    });

    it("delegue isEmpty() à la geometry originale", () => {
        const p = new Point();
        const g = new GeometryWithCachedEnvelope(p);

        expect(g.isEmpty()).to.equal(true);
    });

    it("clone() crée un nouveau decorateur avec un clone interne", () => {
        const p = new Point([5,5]);
        const g = new GeometryWithCachedEnvelope(p);

        const clone = g.clone();

        expect(clone).to.not.equal(g);
        expect(clone.getEnvelope().getXmin()).to.equal(5);
    });

    it("accept(visitor) délègue à l'objet original", () => {
        const p = new Point([1,2]);
        const g = new GeometryWithCachedEnvelope(p);

        let visited = false;

        const fakeVisitor = {
            visitPoint() { visited = true; },
            visitLineString() {},
            visitGeometryCollection() {}
        };

        g.accept(fakeVisitor);

        expect(visited).to.equal(true);
    })

    it("asText() délègue correctement", () => {
        const p = new Point([3,4]);
        const g = new GeometryWithCachedEnvelope(p);

        expect(g.asText()).to.equal("POINT(3 4)");
    });
});