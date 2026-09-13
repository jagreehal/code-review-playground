import {
  createTelemetryEvent,
  type TelemetryPort,
} from "../common/TelemetryPort";
import { MiddlewarePipeline } from "../common/MiddlewarePipeline";
import {
  PluginRegistry,
  type Plugin,
} from "../common/PluginRegistry";
import { Result } from "../common/Result";
import { GreetingCommand } from "./GreetingCommand";
import type { IGreetingStrategy } from "./IGreetingStrategy";

export interface GreetingPipelineContext {
  command: GreetingCommand;
  result?: string;
}

const identityGreetingPlugin: Plugin<GreetingPipelineContext, void> = {
  id: "identity-greeting-plugin",
  priority: 100,
  apply(_context) {
    // Reserved for future greeting enrichment plugins.
  },
};

export class GreetingFacade {
  private readonly pipeline = new MiddlewarePipeline<GreetingPipelineContext>();
  private readonly plugins = new PluginRegistry<GreetingPipelineContext, void>();

  constructor(
    private readonly strategy: IGreetingStrategy,
    private readonly telemetry: TelemetryPort,
  ) {
    this.plugins.register(identityGreetingPlugin);
    this.pipeline.use((ctx, next) => {
      this.telemetry.record(
        createTelemetryEvent("greeting.middleware.before", {
          strategyId: this.strategy.strategyId,
          nameLength: ctx.command.payload.context.name.length,
        }),
      );
      next();
    });
    this.pipeline.use((ctx, next) => {
      this.plugins.applyAll(ctx);
      next();
    });
  }

  greet(name: string): string {
    const command = GreetingCommand.create(name);
    const pipelineContext: GreetingPipelineContext = { command };

    this.pipeline.execute(pipelineContext, (ctx) => {
      const greetingResult = Result.ok(
        this.strategy.greet(ctx.command.payload.context),
      );
      ctx.result = Result.unwrap(
        Result.map(greetingResult, (value) => value),
      );
    });

    this.telemetry.record(
      createTelemetryEvent("greeting.completed", {
        strategyId: this.strategy.strategyId,
      }),
    );

    if (pipelineContext.result === undefined) {
      throw new Error("Greeting pipeline failed to produce a result");
    }

    return pipelineContext.result;
  }
}
