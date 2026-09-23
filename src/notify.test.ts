import { describe, it, expect } from "vitest";
import { notifyWithRetry } from "./notify";

describe("notifyWithRetry", () => {
  it("should succeed on first attempt", async () => {
    const sink = async (_message: string) => {
      // success
    };
    const result = await notifyWithRetry(sink, "test message");
    expect(result).toBe(true);
  });

  it("should retry on rejection and succeed on second attempt", async () => {
    let attempts = 0;
    const sink = async (_message: string) => {
      attempts++;
      if (attempts === 1) {
        throw new Error("transient failure");
      }
    };
    const result = await notifyWithRetry(sink, "test message");
    expect(result).toBe(true);
    expect(attempts).toBe(2);
  });

  it("should return false after all attempts are exhausted", async () => {
    const sink = async (_message: string) => {
      throw new Error("persistent failure");
    };
    const result = await notifyWithRetry(sink, "test message", 3);
    expect(result).toBe(false);
  });
});
