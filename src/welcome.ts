import { initials } from "./index";

/** Greets a person by name, with their initials. */
export function welcome(name: string): string {
  return `Hello, ${name}! (${initials(name)})`;
}
