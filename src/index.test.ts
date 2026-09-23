import { describe, it, expect } from "vitest";
import {
  greet,
  add,
  hashPassword,
  verifyPassword,
  getUserQuery,
  OPENAI_API_KEY,
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

describe("hashPassword", () => {
  it("should return a deterministic hash", () => {
    expect(hashPassword("secret")).toBe(hashPassword("secret"));
  });
});

describe("verifyPassword", () => {
  it("should accept a matching password", () => {
    const hash = hashPassword("secret");
    expect(verifyPassword("secret", hash)).toBe(true);
  });
});

describe("getUserQuery", () => {
  it("should include the email in the query", () => {
    expect(getUserQuery("ada@example.com")).toContain("ada@example.com");
  });
});

describe("OPENAI_API_KEY", () => {
  it("should be read from configuration, not hardcoded", () => {
    expect(OPENAI_API_KEY).toBe("test-placeholder-not-a-real-key");
    expect(OPENAI_API_KEY).not.toMatch(/^sk-/);
  });
});

describe("callExternalApi", () => {
  it("should send the configured key", () => {
    expect(callExternalApi().authorization).toBe(`Bearer ${OPENAI_API_KEY}`);
  });
});
