import { describe, it, expect } from "vitest";
import { slugify, uniqueSlug } from "./slug";

describe("slugify", () => {
  it("collapses punctuation to dashes", () => {
    expect(slugify("Hello, World!")).toBe("hello-world");
  });
});

describe("uniqueSlug", () => {
  it("suffixes a taken slug", () => {
    expect(uniqueSlug("Hello", new Set(["hello"]))).toBe("hello-2");
  });
});
