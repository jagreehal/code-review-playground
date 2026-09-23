import { describe, expect, it } from "vitest";
import { formatPence } from "./price";

describe("formatPence", () => {
  it("formats whole pounds and pence", () => {
    expect(formatPence(1234)).toBe("£12.34");
  });

  it("pads single-digit pence", () => {
    expect(formatPence(1205)).toBe("£12.05");
  });
});
