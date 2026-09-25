import type { BinaryOperands, IBinaryOperation } from "./IBinaryOperation";

export class AdditionOperation implements IBinaryOperation {
  readonly operationId = "arithmetic.addition.v1";

  execute(operands: BinaryOperands): number {
    return operands.left + operands.right;
  }
}
