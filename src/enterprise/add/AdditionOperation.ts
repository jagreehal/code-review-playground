export interface BinaryOperands {
  readonly left: number;
  readonly right: number;
}

export class AdditionOperation {
  readonly operationId = "arithmetic.addition.v1";

  execute(operands: BinaryOperands): number {
    return operands.left + operands.right;
  }
}
