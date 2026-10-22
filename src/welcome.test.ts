import { describe, it, expect } from "vitest";
import { welcome } from "./welcome";

describe("welcome", () => {
  it("greets with initials", () => {
    expect(welcome("Ada Lovelace")).toBe("Hello, Ada Lovelace! (AL)");
  });

  it("ignores surrounding whitespace", () => {
    expect(welcome("  Ada Lovelace ")).toBe("Hello, Ada Lovelace! (AL)");
  });
});
