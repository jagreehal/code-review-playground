import { describe, it, expect, vi, afterEach } from "vitest";
import { buildAuthHeader } from "./auth";

describe("buildAuthHeader", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("should send the configured key", () => {
    expect(buildAuthHeader().authorization).toBe("Bearer test-placeholder-not-a-real-key");
  });

  it("should throw when OPENAI_API_KEY is unset", () => {
    vi.stubEnv("OPENAI_API_KEY", undefined);
    expect(() => buildAuthHeader()).toThrow("OPENAI_API_KEY environment variable is not set");
  });
});
