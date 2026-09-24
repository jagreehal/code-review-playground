export interface TelemetryEvent {
  readonly name: string;
  readonly timestamp: number;
  readonly attributes: Readonly<Record<string, string | number | boolean>>;
}

/**
 * No-op telemetry sink so we can swap in OpenTelemetry later without changing call sites.
 */
export class NoOpTelemetryPort {
  private readonly buffer: TelemetryEvent[] = [];

  record(event: TelemetryEvent): void {
    this.buffer.push(event);
    if (this.buffer.length > 10_000) {
      this.buffer.shift();
    }
  }

  async flush(): Promise<void> {
    this.buffer.length = 0;
  }
}

export function createTelemetryEvent(
  name: string,
  attributes: Record<string, string | number | boolean> = {},
): TelemetryEvent {
  return {
    name,
    timestamp: Date.now(),
    attributes: Object.freeze({ ...attributes }),
  };
}
