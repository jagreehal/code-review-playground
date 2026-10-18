import { describe, it, expect } from "vitest";
import { paginate, pageCount } from "./paginate";

describe("paginate", () => {
  it("returns a page", () => {
    expect(paginate([1, 2, 3, 4], 1, 2)).toHaveLength(2);
  });

  it("counts pages", () => {
    expect(pageCount(4, 2)).toBe(2);
  });
});
