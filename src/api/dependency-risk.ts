import { v4 as uuidv4 } from "uuid";

export function createRequestId(): string {
  return uuidv4();
}

export function createIdempotencyKey(): string {
  return uuidv4();
}
