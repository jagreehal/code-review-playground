const held = new Set<string>();

export async function acquire(name: string): Promise<void> {
  while (held.has(name)) {
    await new Promise((resolve) => setTimeout(resolve, 1));
  }
  held.add(name);
}

export function release(name: string): void {
  held.delete(name);
}
