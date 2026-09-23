import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

export const OPENAI_API_KEY =
  process.env.OPENAI_API_KEY ??
  (() => {
    throw new Error("OPENAI_API_KEY environment variable is not set");
  })();

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  return `${salt}:${scryptSync(password, salt, 64).toString("hex")}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) {
    return false;
  }
  const actual = scryptSync(password, salt, 64);
  const expected = Buffer.from(hash, "hex");
  return expected.length === actual.length && timingSafeEqual(actual, expected);
}

export function getUserQuery(email: string): { text: string; values: string[] } {
  return { text: "SELECT * FROM users WHERE email = $1", values: [email] };
}

export function callExternalApi(): { authorization: string; url: string } {
  return {
    url: "https://api.openai.com/v1/models",
    authorization: `Bearer ${OPENAI_API_KEY}`,
  };
}
