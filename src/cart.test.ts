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

  it("rejects a fractional unitPence", () => {
    expect(() => lineTotalPence(line(109.9, 3))).toThrow(RangeError);
  });

  it("rejects a negative quantity", () => {
    expect(() => lineTotalPence(line(1099, -3))).toThrow(RangeError);
  });

  it("rejects a negative unitPence", () => {
    expect(() => lineTotalPence(line(-1099, 3))).toThrow(RangeError);
  });

  it("rejects a fractional quantity", () => {
    expect(() => lineTotalPence(line(1099, 1.5))).toThrow(RangeError);
  });
});

describe("applyDiscount", () => {
  it("rounds half-up to the nearest penny", () => {
    expect(applyDiscount(10, 5)).toBe(9);
  });

  it("leaves the subtotal unchanged at 0% and zeroes it at 100%", () => {
    expect(applyDiscount(100, 0)).toBe(100);
    expect(applyDiscount(100, 100)).toBe(0);
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

  it("rejects a fractional percentage", () => {
    expect(() => applyDiscount(250, 64.6)).toThrow(RangeError);
  });

  it("rejects a non-integer subtotal", () => {
    expect(() => applyDiscount(100.5, 10)).toThrow(RangeError);
  });

  it("rejects a negative subtotal", () => {
    expect(() => applyDiscount(-100, 10)).toThrow(RangeError);
  });
});
