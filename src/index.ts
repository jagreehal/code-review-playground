export function greet(name: string): string {
  return `Hello, ${name}!`;
}

export function add(a: number, b: number): number {
  return a + b;
}

export async function fetchUser(id: string): Promise<{ id: string; name: string }> {
  return { id, name: "User " + id };
}

export function initials(name: string): string {
  return name
    .split(" ")
    .filter((part) => part.length > 0)
    .map((part) => part[0].toUpperCase())
    .join("");
}
