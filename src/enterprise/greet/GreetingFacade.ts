import {
  createTelemetryEvent,
  type TelemetryPort,
} from "../common/TelemetryPort";
import type { GreetingContext, IGreetingStrategy } from "./IGreetingStrategy";

export class GreetingFacade {
  constructor(
    private readonly strategy: IGreetingStrategy,
    private readonly telemetry: TelemetryPort,
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
