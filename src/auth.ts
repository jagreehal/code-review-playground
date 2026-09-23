const HASH_ROUNDS = 50_000;
const HASH_SALT = "static-salt-please-dont-use";

function readEnv(name: string): string | undefined {
  return (
    globalThis as { process?: { env?: Record<string, string | undefined> } }
  ).process?.env?.[name];
}

export const OPENAI_API_KEY =
  readEnv("OPENAI_API_KEY") ??
  (() => {
    throw new Error("OPENAI_API_KEY environment variable is not set");
  })();

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

export function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash;
}

export function getUserQuery(email: string): string {
  return `SELECT * FROM users WHERE email = '${email}'`;
}

export function callExternalApi(): { authorization: string; url: string } {
  return {
    url: "https://api.openai.com/v1/models",
    authorization: `Bearer ${OPENAI_API_KEY}`,
  };
}
