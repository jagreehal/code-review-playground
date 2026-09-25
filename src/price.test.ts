import { describe, expect, it } from "vitest";
import { formatPence } from "./price";

describe("formatPence", () => {
  it("formats whole pounds and pence", () => {
    expect(formatPence(1234)).toBe("£12.34");
  });

  it("pads single-digit pence", () => {
    expect(formatPence(1205)).toBe("£12.05");
  });

  it("handles zero pence", () => {
    expect(formatPence(1200)).toBe("£12.00");
  });

  it("handles a zero amount", () => {
    expect(formatPence(0)).toBe("£0.00");
  });

  it("handles amounts under a pound", () => {
    expect(formatPence(5)).toBe("£0.05");
  });

  it("handles negative amounts", () => {
    expect(formatPence(-1234)).toBe("-£12.34");
    expect(formatPence(-1350)).toBe("-£13.50");
  });
});
