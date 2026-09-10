import type { UserRecord } from "../data/db";

export function serializeUser(user: UserRecord): Record<string, unknown> {
  return {
    id: user.id,
    displayName: user.name,
    email: user.email,
  };
}
