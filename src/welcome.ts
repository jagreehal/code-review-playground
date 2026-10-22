import { initials } from "./index";

export function welcome(name: string): string {
  const trimmed = name.trim();

  return `Hello, ${trimmed}! (${initials(trimmed)})`;
}
