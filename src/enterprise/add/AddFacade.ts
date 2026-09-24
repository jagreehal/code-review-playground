import {
  createTelemetryEvent,
  type NoOpTelemetryPort,
} from "../common/TelemetryPort";
import type { AdditionOperation } from "./AdditionOperation";

export class AddFacade {
  constructor(
    private readonly operation: AdditionOperation,
    private readonly telemetry: NoOpTelemetryPort,
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
