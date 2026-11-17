import { expect, test } from "vitest";
import { applyDiscountCents, subtotalCents } from "./invoice";

test("a discount rounds once, to whole cents", () => {
  expect(applyDiscountCents(1001, 10)).toBe(901);
  expect(applyDiscountCents(subtotalCents([500, 501]), 0)).toBe(1001);
});
