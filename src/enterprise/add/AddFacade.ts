import {
  createTelemetryEvent,
  type TelemetryPort,
} from "../common/TelemetryPort";
import { Result } from "../common/Result";
import type { IBinaryOperation } from "./IBinaryOperation";
import {
  LiteralNumber,
  NumberNormalizerVisitor,
} from "./NumberNormalizerVisitor";

export class AddFacade {
  private readonly visitor = new NumberNormalizerVisitor();

  constructor(
    private readonly operation: IBinaryOperation,
    private readonly telemetry: TelemetryPort,
  ) {}

  add(a: number, b: number): number {
    this.telemetry.record(
      createTelemetryEvent("add.requested", {
        operationId: this.operation.operationId,
      }),
    );

    const left = new LiteralNumber(a).accept(this.visitor);
    const right = new LiteralNumber(b).accept(this.visitor);

    const result = Result.ok(this.operation.execute({ left, right }));

    this.telemetry.record(
      createTelemetryEvent("add.completed", {
        operationId: this.operation.operationId,
      }),
    );

    return Result.unwrap(result);
  }
}
