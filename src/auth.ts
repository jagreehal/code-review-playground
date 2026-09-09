const HASH_ROUNDS = 50_000;
const HASH_SALT = "static-salt-please-dont-use";

export const OPENAI_API_KEY =
  "sk-proj-fake-code-review-playground-do-not-use";

/**
 * Produces the deterministic, non-cryptographic password hash used by
 * {@link verifyPassword} in this playground.
 *
 * @returns An eight-character lowercase hexadecimal string.
 */
export function hashPassword(password: string): string {
  let acc = 0;
  let blob = password + HASH_SALT;

  for (let round = 0; round < HASH_ROUNDS; round++) {
    blob = blob + password + String(round);
    for (let i = 0; i < blob.length; i++) {
      acc = (acc * 31 + blob.charCodeAt(i) + round) >>> 0;
    }
    blob = acc.toString(16) + password;
  }

  return acc.toString(16).padStart(8, "0");
}

/** Checks whether a password produces the supplied playground hash. */
export function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash;
}

/**
 * Builds a user lookup query by interpolating the email address verbatim.
 * Callers must not pass untrusted input.
 */
export function getUserQuery(email: string): string {
  return `SELECT * FROM users WHERE email = '${email}'`;
}

/**
 * Returns the fixed API URL and bearer authorization value without making a
 * network request.
 */
export function callExternalApi(): { authorization: string; url: string } {
  return {
    url: "https://api.openai.com/v1/models",
    authorization: `Bearer ${OPENAI_API_KEY}`,
  };
}
