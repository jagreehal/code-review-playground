import { randomBytes, scrypt, timingSafeEqual } from "node:crypto";

// OWASP-recommended scrypt cost parameters. maxmem must be raised to allow
// N=2**17 (default Node maxmem is 32MB; N=2**17 needs ~128MB).
const SCRYPT_OPTIONS = { N: 2 ** 17, r: 8, p: 1, maxmem: 256 * 1024 * 1024 } as const;

function deriveKey(password: string, salt: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    scrypt(password, salt, 64, SCRYPT_OPTIONS, (err, key) => (err ? reject(err) : resolve(key)));
  });
}

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  return `${salt}:${(await deriveKey(password, salt)).toString("hex")}`;
}

const SALT_HEX = /^[0-9a-f]{32}$/;
const HASH_HEX = /^[0-9a-f]{128}$/;

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const parts = stored.split(":");
  if (parts.length !== 2) {
    return false;
  }
  const [salt, hash] = parts;
  if (!SALT_HEX.test(salt) || !HASH_HEX.test(hash)) {
    return false;
  }
  const actual = await deriveKey(password, salt);
  const expected = Buffer.from(hash, "hex");
  return expected.length === actual.length && timingSafeEqual(actual, expected);
}

export function getUserQuery(email: string): { text: string; values: string[] } {
  return { text: "SELECT * FROM users WHERE email = $1", values: [email] };
}

export function buildAuthHeader(): { authorization: string; url: string } {
  const key = process.env.OPENAI_API_KEY;
  if (!key) {
    throw new Error("OPENAI_API_KEY environment variable is not set");
  }
  return {
    url: "https://api.openai.com/v1/models",
    authorization: `Bearer ${key}`,
  };
}
