import { initials } from "./index";

export function welcome(name: string): string {
  const trimmed = name.trim();
  const parts = trimmed.split(/\s+/);

  return parts.length > 1 ? `Hello, ${trimmed}! (${initials(trimmed)})` : `Hello, ${trimmed}!`;
}
