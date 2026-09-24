import {
  createTelemetryEvent,
  type NoOpTelemetryPort,
} from "../common/TelemetryPort";
import type {
  DefaultGreetingStrategy,
  GreetingContext,
} from "./DefaultGreetingStrategy";

export class GreetingFacade {
  constructor(
    private readonly strategy: DefaultGreetingStrategy,
    private readonly telemetry: NoOpTelemetryPort,
  ) {}

  greet(name: string): string {
    const context: GreetingContext = { name };

    this.telemetry.record(
      createTelemetryEvent("greeting.middleware.before", {
        strategyId: this.strategy.strategyId,
        nameLength: context.name.length,
      }),
    );

    const result = this.strategy.greet(context);

    this.telemetry.record(
      createTelemetryEvent("greeting.completed", {
        strategyId: this.strategy.strategyId,
      }),
    );

    return result;
  }
}
