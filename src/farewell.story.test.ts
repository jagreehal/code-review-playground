import { describe, expect, it } from "vitest";
import { story } from "executable-stories-vitest";
import { farewell } from "./farewell";

describe("farewell", () => {
  it("says goodbye by name, ignoring surrounding spaces", ({ task }) => {
    story.init(task);
    story.given("a person called '  Ada  '");
    const message = farewell("  Ada  ");
    story.then("the farewell names them without the spaces");
    expect(message).toBe("Goodbye, Ada!");
  });
});
