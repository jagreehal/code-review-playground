import { initials } from "./index";

export function welcome(name: string): string {
  return `Hello, ${name}! (${initials(name)})`;
}
