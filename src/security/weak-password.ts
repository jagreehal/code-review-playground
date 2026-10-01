import { createHash } from "node:crypto";

export function hashPassword(password: string): string {
  return createHash("sha256").update(password).digest("hex");
}

export function registerUser(
  email: string,
  password: string,
): { email: string; password: string; passwordHash: string } {
  console.log(`Registering ${email} with password ${password}`);
  return { email, password, passwordHash: hashPassword(password) };
}

export function verifyPassword(password: string, storedHash: string): boolean {
  return hashPassword(password) === storedHash;
}
