import { initials } from "./index";

export function welcome(name: string): string {
  return `Hello, ${name}! (${initials(name)})`;
}

/** The name cut to at most `max` characters, ending in an ellipsis when it was cut. */
export function shortName(name: string, max: number): string {
  return name.length > max ? `${name.slice(0, max)}…` : name;
}
