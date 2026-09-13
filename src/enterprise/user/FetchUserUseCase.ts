import {
  createTelemetryEvent,
  type TelemetryPort,
} from "../common/TelemetryPort";
import { Result } from "../common/Result";
import type { IUserRepository, UserRecord } from "./IUserRepository";
import { UnitOfWork } from "./UnitOfWork";
import { UserFactory } from "./UserFactory";

export class FetchUserUseCase {
  constructor(
    private readonly repository: IUserRepository,
    private readonly userFactory: UserFactory,
    private readonly telemetry: TelemetryPort,
  ) {}

  async execute(id: string): Promise<UserRecord> {
    this.telemetry.record(
      createTelemetryEvent("user.fetch.requested", { idLength: id.length }),
    );

    const existing = await this.repository.findById(id);
    if (existing) {
      return Result.unwrap(Result.ok(existing));
    }

    const unitOfWork = new UnitOfWork(this.repository);
    const aggregate = this.userFactory.create({ id });
    unitOfWork.register(aggregate);
    const [saved] = await unitOfWork.commit();

    if (!saved) {
      throw new Error("Unit of Work commit produced no user");
    }

    this.telemetry.record(
      createTelemetryEvent("user.fetch.completed", { idLength: id.length }),
    );

    return saved;
  }
}
