import type { UserRecord } from "./IUserRepository";
import { FetchUserUseCase } from "./FetchUserUseCase";

export class FetchUserFacade {
  constructor(private readonly useCase: FetchUserUseCase) {}

  async fetchUser(id: string): Promise<UserRecord> {
    return this.useCase.execute(id);
  }
}
