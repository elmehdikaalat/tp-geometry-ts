import Geometry from "./Geometry";
import Envelope from "./Envelope";
import GeometryVisitor from "./GeometryVisitor";

export default class GeometryWithCachedEnvelope implements Geometry {
    
    private original: Geometry;
    private cachedEnvelope: Envelope | null = null;

    constructor(original: Geometry) {
        this.original = original;
    }
    
    getType(): string {
        return this.original.getType();
    }
    isEmpty(): boolean {
        return this.original.isEmpty();
    }
    translate(dx: number, dy: number): void {
        this.original.translate(dx, dy);
        this.cachedEnvelope = null;
    }
    clone(): Geometry {
        return new GeometryWithCachedEnvelope(this.original.clone());
    }
    getEnvelope(): Envelope {
        if (this.cachedEnvelope === null) {
            this.cachedEnvelope = this.original.getEnvelope();
        }
        return this.cachedEnvelope;
    }
    accept(visitor: GeometryVisitor): void {
        this.original.accept(visitor);
    }
    asText(): string {
        return this.original.asText();
    }
}