import {
  createTelemetryEvent,
  type TelemetryPort,
} from "../common/TelemetryPort";
import { GreetingCommand } from "./GreetingCommand";
import type { IGreetingStrategy } from "./IGreetingStrategy";

export class GreetingFacade {
  constructor(
    private readonly strategy: IGreetingStrategy,
    private readonly telemetry: TelemetryPort,
  ) {}

  greet(name: string): string {
    const command = GreetingCommand.create(name);

    this.telemetry.record(
      createTelemetryEvent("greeting.middleware.before", {
        strategyId: this.strategy.strategyId,
        nameLength: command.payload.context.name.length,
      }),
    );

    const result = this.strategy.greet(command.payload.context);

    this.telemetry.record(
      createTelemetryEvent("greeting.completed", {
        strategyId: this.strategy.strategyId,
      }),
    );

    return result;
  }
}
