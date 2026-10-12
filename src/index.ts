export function greet(name: string | null | undefined): string {
  return `Hi, ${(name ?? "").trim()}!`;
}

/** Adds two numbers. */
export function add(a: number, b: number): number {
  return a + b;
}

export async function fetchUser(id: string | number): Promise<{ id: string; name: string }> {
  const key = String(id).trim();

  return { id: key, name: "User " + key };
}

export function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0].toUpperCase())
    .join("");
}

/** Subtracts b from a. */
export function subtract(a: number, b: number): number {
  return a - b;
}

/** Multiplies two numbers. */
export function multiply(a: number, b: number): number {
  return a * b;
}

/** Divides a by b. Throws on division by zero. */
export function divide(a: number, b: number): number {
  if (b === 0) throw new RangeError("division by zero");

  return a / b;
}

/** Limits n to the range [min, max]. */
export function clamp(n: number, min: number, max: number): number {
  return Math.min(Math.max(n, min), max);
}
