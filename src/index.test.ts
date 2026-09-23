import { describe, it, expect, vi, afterEach } from "vitest";
import {
  greet,
  add,
  hashPassword,
  verifyPassword,
  getUserQuery,
  callExternalApi,
} from "./index";

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
  it("should accept a matching password", () => {
    const hash = hashPassword("secret");
    expect(verifyPassword("secret", hash)).toBe(true);
  });

  it("should reject a wrong password", () => {
    expect(verifyPassword("wrong", hashPassword("secret"))).toBe(false);
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

describe("callExternalApi", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("should send the configured key", () => {
    expect(callExternalApi().authorization).toBe("Bearer test-placeholder-not-a-real-key");
  });

  it("should throw when OPENAI_API_KEY is unset", () => {
    vi.stubEnv("OPENAI_API_KEY", undefined);
    expect(() => callExternalApi()).toThrow("OPENAI_API_KEY environment variable is not set");
  });
});
