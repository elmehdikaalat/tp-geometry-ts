import "mocha";
import { expect } from "chai";
import Envelope from "../src/Envelope";
import EnvelopeBuilder from "../src/EnvelopeBuilder";

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