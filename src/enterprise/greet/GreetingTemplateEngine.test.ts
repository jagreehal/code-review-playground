import { describe, it, expect } from "vitest";
import { GreetingTemplateEngine } from "./GreetingTemplateEngine";

describe("GreetingTemplateEngine", () => {
  it("renders placeholders in a single pass without expanding token values", () => {
    const engine = new GreetingTemplateEngine("{{a}}");
    expect(engine.render({ a: "{{b}}", b: "x" })).toBe("{{b}}");
    expect(engine.render({ b: "x", a: "{{b}}" })).toBe("{{b}}");
  });

  it("leaves unknown placeholders untouched", () => {
    const engine = new GreetingTemplateEngine("Hello, {{name}}!");
    expect(engine.render({})).toBe("Hello, {{name}}!");
  });
});
