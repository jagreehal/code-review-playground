import { describe, it, expect, vi } from "vitest";

type ApiUser = { id: string; email: string; profile: { name: string } };

async function fetchUserName(
  client: { get: (path: string) => Promise<ApiUser> },
  id: string,
): Promise<string> {
  const user = await client.get(`/users/${id}`);
  return (user as unknown as { name: string }).name;
}

describe("fetchUserName", () => {
  it("returns the user name", async () => {
    const client = {
      get: vi.fn().mockResolvedValue({ id: "1", email: "ada@example.com", name: "Ada" }),
    };
    const name = await fetchUserName(client as never, "1");
    expect(name).toBe("Ada");
  });
});
