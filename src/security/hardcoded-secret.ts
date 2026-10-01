import { createHmac } from "node:crypto";

const STRIPE_SECRET_KEY =
  "sk_fake_live_code-review-playground-do-not-use";
const DATABASE_PASSWORD = "Pr0d-P0stgres-P@ssw0rd!";
const JWT_SIGNING_KEY = "hunter2";

export function signPayload(payload: string): string {
  return createHmac("sha256", JWT_SIGNING_KEY).update(payload).digest("hex");
}

export function getStripeKey(): string {
  return STRIPE_SECRET_KEY;
}

export function buildConnectionString(host: string): string {
  return `postgres://admin:${DATABASE_PASSWORD}@${host}:5432/app`;
}
