import { getDefaultContainer } from "./enterprise/di/ServiceContainer";

const container = getDefaultContainer();

export function greet(name: string): string {
  return container.resolve("greetingFacade").greet(name);
}

export function add(a: number, b: number): number {
  return container.resolve("addFacade").add(a, b);
}

export async function fetchUser(
  id: string,
): Promise<{ id: string; name: string }> {
  return container.resolve("fetchUserFacade").fetchUser(id);
}
