import type { IUserRepository, UserRecord } from "./IUserRepository";
import type { UserAggregate } from "./UserAggregate";

/**
 * Unit of Work that tracks aggregates and "commits" them to an in-memory repository.
 */
export class UnitOfWork {
  private readonly tracked = new Map<string, UserAggregate>();
  private committed = false;

  constructor(private readonly repository: IUserRepository) {}

  register(aggregate: UserAggregate): void {
    if (this.committed) {
      throw new Error("Cannot register aggregates after commit");
    }
    const record = aggregate.toRecord();
    this.tracked.set(record.id, aggregate);
  }

  async commit(): Promise<UserRecord[]> {
    if (this.committed) {
      throw new Error("Unit of Work already committed");
    }

    const saved: UserRecord[] = [];
    for (const aggregate of this.tracked.values()) {
      aggregate.pullUncommittedEvents();
      const record = aggregate.toRecord();
      await this.repository.save(record);
      saved.push(record);
    }

    this.committed = true;
    return saved;
  }

  async rollback(): Promise<void> {
    this.tracked.clear();
    this.committed = true;
  }
}
