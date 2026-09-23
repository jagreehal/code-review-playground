import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

// OWASP-recommended scrypt cost parameters. maxmem must be raised to allow
// N=2**17 (default Node maxmem is 32MB; N=2**17 needs ~128MB).
const SCRYPT_OPTIONS = { N: 2 ** 17, r: 8, p: 1, maxmem: 256 * 1024 * 1024 } as const;

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  return `${salt}:${scryptSync(password, salt, 64, SCRYPT_OPTIONS).toString("hex")}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) {
    return false;
  }
  const actual = scryptSync(password, salt, 64, SCRYPT_OPTIONS);
  const expected = Buffer.from(hash, "hex");
  return expected.length === actual.length && timingSafeEqual(actual, expected);
}

export function getUserQuery(email: string): { text: string; values: string[] } {
  return { text: "SELECT * FROM users WHERE email = $1", values: [email] };
}

export function callExternalApi(): { authorization: string; url: string } {
  const key = process.env.OPENAI_API_KEY;
  if (!key) {
    throw new Error("OPENAI_API_KEY environment variable is not set");
  }
  return {
    url: "https://api.openai.com/v1/models",
    authorization: `Bearer ${key}`,
  };
}
