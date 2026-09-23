import {
  createTelemetryEvent,
  type TelemetryPort,
} from "../common/TelemetryPort";
import type { IBinaryOperation } from "./IBinaryOperation";

export class AddFacade {
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

    const result = this.operation.execute({ left: a, right: b });

    this.telemetry.record(
      createTelemetryEvent("add.completed", {
        operationId: this.operation.operationId,
      }),
    );

    return result;
  }
}
