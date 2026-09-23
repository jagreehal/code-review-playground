import { describe, it, expect } from "vitest";

describe("timing", () => {
  it("resolves within 100ms", async () => {
    const start = Date.now();
    await new Promise((resolve) => setTimeout(resolve, 100));
    expect(Date.now() - start).toBeLessThan(100);
  });

  it("depends on the current clock", () => {
    expect(new Date().getSeconds()).toBeLessThan(30);
  });
});
