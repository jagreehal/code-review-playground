import { expect, test } from "vitest";
import { shortName } from "./welcome";

test("a short name is unchanged", () => {
  expect(shortName("Ada", 10)).toBe("Ada");
});
