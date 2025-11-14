import "mocha";
import { expect } from "chai";
import Point from "../src/Point";

describe("test Point", () => {

    it("test default constructor ", () => {
        const p = new Point();

        expect(p.getCoordinate()).to.deep.equal([]);
        expect(p.isEmpty()).to.equal(true);

        expect(Number.isNaN(p.x())).to.equal(true);
        expect(Number.isNaN(p.y())).to.equal(true);

        expect(p.getType()).to.equal("Point");
    });

    it("test constructor with coordinates", () => {
        const p = new Point([3.0, 4.0]);

        expect(p.getCoordinate()).to.deep.equal([3.0, 4.0]);
        expect(p.isEmpty()).to.equal(false);

        expect(p.x()).to.equal(3.0);
        expect(p.y()).to.equal(4.0);

        expect(p.getType()).to.equal("Point");
    });

    it("test translate", () => {
        const p = new Point([3.0, 4.0]);
        p.translate(2, -1);

        expect(p.getCoordinate()).to.deep.equal([5.0, 3.0]);
        expect(p.x()).to.equal(5.0);
        expect(p.y()).to.equal(3.0);
    });

    it("test translate on empty point", () => {
        const p = new Point(); 
        p.translate(10, 10);
        expect(p.getCoordinate()).to.deep.equal([]);
        expect(p.isEmpty()).to.equal(true);
    });


    it("clone of empty point", () => {
        const p = new Point();
        const c = p.clone();

        expect(c.getCoordinate()).to.deep.equal([]);
        expect(c).to.not.equal(p);
    });

    it("clone of non empty point", () => {
        const p = new Point([1,2]);
        const c = p.clone();

        expect(c.getCoordinate()).to.deep.equal([1,2]);
        expect(c).to.not.equal(p);

        c.translate(10,10);
        expect(p.getCoordinate()).to.deep.equal([1,2]);
    });

    it("test getEnvelope on empty point", () => {
        const p = new Point();
        const env = p.getEnvelope();

        expect(env.isEmpty()).to.equal(true);
    });

    it("test getEnvelope on non-empty point", () => {
        const p = new Point([3, 4]);
        const env = p.getEnvelope();

        expect(env.isEmpty()).to.equal(false);
        expect(env.getXmin()).to.equal(3);
        expect(env.getYmin()).to.equal(4);
        expect(env.getXmax()).to.equal(3);
        expect(env.getYmax()).to.equal(4);
    });

    it("test asText() on empty point", () => {
        const p = new Point();
        expect(p.asText()).to.equal("POINT EMPTY");
    });

    it("test asText() on non-empty point", () => {
        const p = new Point([3.0, 4.0]);
        expect(p.asText()).to.equal("POINT(3 4)");
    });

});