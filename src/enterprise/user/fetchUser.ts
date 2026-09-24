export interface UserRecord {
  readonly id: string;
  readonly name: string;
}

const users = new Map<string, UserRecord>();

export async function fetchUser(id: string): Promise<UserRecord> {
  const existing = users.get(id);
  if (existing) {
    return existing;
  }

  const user: UserRecord = { id, name: `User ${id}` };
  users.set(id, user);
  return user;
}
