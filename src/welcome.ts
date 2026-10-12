import { greet, initials } from "./index";

export function welcome(name: string): string {
  return `${greet(name)} (${initials(name)})`;
}
