import type { UserRecord } from "./IUserRepository";

export type UserDomainEvent =
  | { readonly type: "UserCreated"; readonly id: string; readonly name: string };

/**
 * DDD aggregate wrapping a two-field user record.
 */
export class UserAggregate {
  private readonly uncommitted: UserDomainEvent[] = [];

  private constructor(
    private id: string,
    private name: string,
  ) {}

  static create(id: string, name: string): UserAggregate {
    const aggregate = new UserAggregate(id, name);
    aggregate.uncommitted.push({ type: "UserCreated", id, name });
    return aggregate;
  }

  static rehydrate(record: UserRecord): UserAggregate {
    return new UserAggregate(record.id, record.name);
  }

  toRecord(): UserRecord {
    return { id: this.id, name: this.name };
  }

  pullUncommittedEvents(): UserDomainEvent[] {
    const events = [...this.uncommitted];
    this.uncommitted.length = 0;
    return events;
  }
}
