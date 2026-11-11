import { describe, expect, it } from "vitest";
import { startOfDayIso } from "./dates";

describe("startOfDayIso", () => {
  it("returns midnight at the start of the day", () => {
    expect(startOfDayIso(2026, 7, 1)).toBe("2026-07-01T00:00:00.000Z");
  });
});
