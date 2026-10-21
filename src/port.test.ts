import { expect, test } from "vitest";
import { parsePort } from "./port";

test("reads the port", () => {
  expect(parsePort("localhost:8080")).toBe(8080);
});
