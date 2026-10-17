import { describe, it, expect } from "vitest";
import { greet, add, initials, divide, fetchUser, clamp } from "./index";

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

  it("ignores empty segments from repeated spaces", () => {
    expect(initials("Grace  Hopper")).toBe("GH");
  });
});

describe("divide", () => {
  it("divides and refuses zero", () => {
    expect(divide(6, 3)).toBe(2);
    expect(() => divide(1, 0)).toThrow(RangeError);
  });
});

describe("fetchUser", () => {
  it("ignores whitespace around the id", async () => {
    expect(await fetchUser(" 42 ")).toEqual({ id: "42", name: "User 42" });
  });

  it("accepts a numeric id (legacy-sync payload)", async () => {
    const user = await fetchUser(1932);
    expect(user.name).toBe("User 1932");
  });
});

describe("clamp", () => {
  it("keeps a number inside its range", () => {
    expect(clamp(5, 0, 3)).toBe(3);
    expect(clamp(-1, 0, 3)).toBe(0);
    expect(clamp(2, 0, 3)).toBe(2);
  });
});
