import { expect, test } from "vitest";
import { pageCount } from "./paging";

test("an exact multiple fills whole pages", () => {
  expect(pageCount(20, 10)).toBe(2);
});
