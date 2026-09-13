export interface BinaryOperands {
  readonly left: number;
  readonly right: number;
}

export interface IBinaryOperation {
  readonly operationId: string;
  execute(operands: BinaryOperands): number;
}
