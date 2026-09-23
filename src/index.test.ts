import { describe, it, expect } from "vitest";
import { greet, add, hashPassword, verifyPassword, getUserQuery } from "./index";

describe("greet", () => {
  it("should return a greeting", () => {
    expect(greet("World")).toBe("Hello, World!");
  });
});

describe("add", () => {
  it("should add two numbers", () => {
    expect(add(2, 3)).toBe(5);
  });
});

describe("verifyPassword", () => {
  it("should accept a matching password", async () => {
    const hash = await hashPassword("secret");
    expect(await verifyPassword("secret", hash)).toBe(true);
  });

  it("should reject a wrong password", async () => {
    expect(await verifyPassword("wrong", await hashPassword("secret"))).toBe(false);
  });
});

describe("getUserQuery", () => {
  it("should include the email in the query", () => {
    expect(getUserQuery("ada@example.com")).toEqual({
      text: "SELECT * FROM users WHERE email = $1",
      values: ["ada@example.com"],
    });
  });
});
