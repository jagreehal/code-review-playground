export interface NumberVisitable {
  accept(visitor: NumberVisitor): number;
}

export interface NumberVisitor {
  visitLiteral(value: number): number;
  visitNormalized(value: number): number;
}

export class LiteralNumber implements NumberVisitable {
  constructor(readonly value: number) {}

  accept(visitor: NumberVisitor): number {
    return visitor.visitLiteral(this.value);
  }
}

/**
 * Visitor that identity-maps numbers so we can insert transforms later.
 */
export class NumberNormalizerVisitor implements NumberVisitor {
  visitLiteral(value: number): number {
    return this.visitNormalized(value);
  }

  visitNormalized(value: number): number {
    return value;
  }
}
