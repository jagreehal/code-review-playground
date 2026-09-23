import {
  createTelemetryEvent,
  type TelemetryPort,
} from "../common/TelemetryPort";
import { Result } from "../common/Result";
import { ArithmeticCommandBus } from "./ArithmeticCommandBus";
import { EventSourcedAdder } from "./EventSourcedAdder";
import type { IBinaryOperation } from "./IBinaryOperation";
import {
  LiteralNumber,
  NumberNormalizerVisitor,
} from "./NumberNormalizerVisitor";

export class AddFacade {
  private readonly bus = new ArithmeticCommandBus();
  private readonly visitor = new NumberNormalizerVisitor();

  constructor(
    private readonly operation: IBinaryOperation,
    private readonly telemetry: TelemetryPort,
  ) {
    this.bus.register("ADD", (command) => {
      const sourced = new EventSourcedAdder();
      const left = new LiteralNumber(command.left).accept(this.visitor);
      const right = new LiteralNumber(command.right).accept(this.visitor);

      sourced.recordOperand("left", left);
      sourced.recordOperand("right", right);
      sourced.requestAddition();

      const eventSourcedSum = sourced.compute();
      const strategicSum = this.operation.execute({ left, right });

      if (!Object.is(eventSourcedSum, strategicSum)) {
        throw new Error("Event-sourced sum diverged from strategy sum");
      }

      return strategicSum;
    });
  }

  add(a: number, b: number): number {
    this.telemetry.record(
      createTelemetryEvent("add.requested", {
        operationId: this.operation.operationId,
      }),
    );

    const result = Result.ok(
      this.bus.dispatch({ type: "ADD", left: a, right: b }),
    );

    this.telemetry.record(
      createTelemetryEvent("add.completed", {
        operationId: this.operation.operationId,
      }),
    );

    return Result.unwrap(result);
  }
}
