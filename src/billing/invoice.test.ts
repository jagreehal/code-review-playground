import { expect, test } from "vitest";
import { addTaxCents, applyDiscountCents, subtotalCents } from "./invoice";

test("a discount rounds once, to whole cents", () => {
  expect(applyDiscountCents(1001, 10)).toBe(901);
  expect(applyDiscountCents(subtotalCents([500, 501]), 0)).toBe(1001);
});

test("tax rounds once, to whole cents", () => {
  expect(addTaxCents(101, 0.2)).toBe(121);
  expect(addTaxCents(1000, 0)).toBe(1000);
});
