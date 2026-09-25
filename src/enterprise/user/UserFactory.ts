import { AbstractFactory } from "../common/AbstractFactory";
import { UserAggregate } from "./UserAggregate";

export interface UserFactoryContext {
  readonly id: string;
}

/**
 * Factory that materializes users with the canonical "User {id}" naming scheme.
 */
export class UserFactory extends AbstractFactory<UserAggregate, UserFactoryContext> {
  create(context: UserFactoryContext): UserAggregate {
    return UserAggregate.create(context.id, `User ${context.id}`);
  }
}
