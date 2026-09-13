import type { IUserRepository, UserRecord } from "./IUserRepository";

export class InMemoryUserRepository implements IUserRepository {
  private readonly store = new Map<string, UserRecord>();

  async findById(id: string): Promise<UserRecord | null> {
    return this.store.get(id) ?? null;
  }

  async save(user: UserRecord): Promise<void> {
    this.store.set(user.id, { ...user });
  }
}
