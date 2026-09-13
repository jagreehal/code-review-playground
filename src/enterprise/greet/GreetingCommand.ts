import type { GreetingContext } from "./IGreetingStrategy";

export interface GreetingCommandPayload {
  readonly context: GreetingContext;
  readonly requestedAt: number;
}

export class GreetingCommand {
  readonly type = "GREETING_REQUESTED" as const;

  constructor(readonly payload: GreetingCommandPayload) {}

  static create(name: string): GreetingCommand {
    return new GreetingCommand({
      context: { name },
      requestedAt: Date.now(),
    });
  }
}
