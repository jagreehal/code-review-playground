import { describe, it, expect } from "vitest";
import { applyDiscount, lineTotalPence, subtotalPence } from "./cart";

const line = (unitPence: number, quantity: number) => ({ sku: "sku", unitPence, quantity });

describe("subtotalPence", () => {
  it("sums line totals", () => {
    expect(subtotalPence([line(250, 2), line(199, 1)])).toBe(699);
  });

  it("is zero for an empty cart", () => {
    expect(subtotalPence([])).toBe(0);
  });
});

describe("lineTotalPence", () => {
  it("multiplies unit price by quantity", () => {
    expect(lineTotalPence(line(1099, 3))).toBe(3297);
  });
});

describe("applyDiscount", () => {
  it("rounds half-up to the nearest penny", () => {
    expect(applyDiscount(999, 10)).toBe(899);
  });

  it("rejects a percentage outside 0-100", () => {
    expect(() => applyDiscount(100, 101)).toThrow(RangeError);
  });

  it("rejects a non-finite percentage", () => {
    expect(() => applyDiscount(100, Number.NaN)).toThrow(RangeError);
  });

  it("rejects a negative percentage", () => {
    expect(() => applyDiscount(100, -10)).toThrow(RangeError);
  });
});
