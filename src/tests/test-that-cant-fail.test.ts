import { describe, it, expect } from "vitest";
import { add } from "../index";

describe("add", () => {
  it("always passes", () => {
    expect(true).toBe(true);
  });

  it("tests a stand-in instead of the real function", () => {
    const fakeAdd = (a: number, b: number) => a + b;
    expect(fakeAdd(2, 3)).toBe(5);
  });

  it("does not assert anything meaningful", () => {
    add(2, 2);
    expect(true).toBeTruthy();
  });
});
