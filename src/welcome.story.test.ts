import { describe, expect, it } from "vitest";
import { story } from "executable-stories-vitest";
import { welcome } from "./welcome";

describe("welcome", () => {
  it("greets a person by name with their initials", ({ task }) => {
    story.init(task);
    story.given("a person called Ada Lovelace");
    const greeting = welcome("Ada Lovelace");
    story.then("the greeting names them");
    expect(greeting).toContain("Ada Lovelace");
    story.and("it shows their initials");
    expect(greeting).toContain("(AL)");
  });

  it("greets a person with a single name by that name and its initial", ({ task }) => {
    story.init(task);
    story.given("a person called Plato");
    const greeting = welcome("Plato");
    story.then("the greeting names them");
    expect(greeting).toContain("Plato");
    story.and("it shows their initial");
    expect(greeting).toContain("(P)");
  });
});
