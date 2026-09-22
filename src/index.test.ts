import { describe, it, expect } from "vitest";
import { greet, add } from "./index";

describe("greet", () => {
  it("should return a greeting", () => {
    expect(greet("World")).toBe("Hello, World!");
  });
});

describe("add", () => {
  it.skip("should add two numbers", () => {
    expect(add(2, 3)).toBe(5);
  });
});
