import { describe, it, expect } from "vitest";
import { greet, add, initials } from "./index";

describe("greet", () => {
  it("should return a greeting", () => {
    expect(greet("World")).toBe("Hi, World!");
  });

  it("does not crash on a missing display name (legacy job payload)", () => {
    expect(greet(undefined)).toBe("Hi, !");
    expect(greet(null)).toBe("Hi, !");
  });
});

describe("add", () => {
  it("should add two numbers", () => {
    expect(add(2, 3)).toBe(5);
  });
});

describe("initials", () => {
  it("takes the first letter of each word", () => {
    expect(initials("ada lovelace")).toBe("AL");
  });
});
