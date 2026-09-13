export type ArithmeticCommand =
  | { readonly type: "ADD"; readonly left: number; readonly right: number };

export type ArithmeticCommandHandler<TCommand extends ArithmeticCommand> = (
  command: TCommand,
) => number;

/**
 * Synchronous in-process command bus with exactly one registered handler.
 */
export class ArithmeticCommandBus {
  private readonly handlers = new Map<
    ArithmeticCommand["type"],
    ArithmeticCommandHandler<ArithmeticCommand>
  >();

  register<TCommand extends ArithmeticCommand>(
    type: TCommand["type"],
    handler: ArithmeticCommandHandler<TCommand>,
  ): void {
    if (this.handlers.has(type)) {
      throw new Error(`Handler already registered for ${type}`);
    }
    this.handlers.set(
      type,
      handler as ArithmeticCommandHandler<ArithmeticCommand>,
    );
  }

  dispatch(command: ArithmeticCommand): number {
    const handler = this.handlers.get(command.type);
    if (!handler) {
      throw new Error(`No handler registered for ${command.type}`);
    }
    return handler(command);
  }
}
