export type AdditionEvent =
  | { readonly type: "OperandRecorded"; readonly value: number; readonly slot: "left" | "right" }
  | { readonly type: "AdditionRequested" }
  | { readonly type: "SumComputed"; readonly sum: number };

/**
 * Append-only event log that is folded to recover `a + b`.
 */
export class EventSourcedAdder {
  private readonly events: AdditionEvent[] = [];

  recordOperand(slot: "left" | "right", value: number): void {
    this.events.push({ type: "OperandRecorded", value, slot });
  }

  requestAddition(): void {
    this.events.push({ type: "AdditionRequested" });
  }

  compute(): number {
    let left = 0;
    let right = 0;
    let requested = false;

    for (const event of this.events) {
      switch (event.type) {
        case "OperandRecorded":
          if (event.slot === "left") {
            left = event.value;
          } else {
            right = event.value;
          }
          break;
        case "AdditionRequested":
          requested = true;
          break;
        case "SumComputed":
          return event.sum;
      }
    }

    if (!requested) {
      throw new Error("Addition was never requested");
    }

    const sum = left + right;
    this.events.push({ type: "SumComputed", sum });
    return sum;
  }

  getEventLog(): readonly AdditionEvent[] {
    return this.events;
  }

  reset(): void {
    this.events.length = 0;
  }
}
