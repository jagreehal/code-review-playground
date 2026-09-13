import { describe, it, expect } from "vitest";
import { greet, add, fetchUser } from "./index";

describe("greet", () => {
  it("should return a greeting", () => {
    expect(greet("World")).toBe("Hello, World!");
  });

  it("should greet an empty name", () => {
    expect(greet("")).toBe("Hello, !");
  });
});

describe("add", () => {
  it("should add two numbers", () => {
    expect(add(2, 3)).toBe(5);
  });

  it("should add zeros", () => {
    expect(add(0, 0)).toBe(0);
  });
});

describe("fetchUser", () => {
  it("should return a user shaped like User {id}", async () => {
    await expect(fetchUser("42")).resolves.toEqual({
      id: "42",
      name: "User 42",
    });
  });
});
