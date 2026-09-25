export interface UserRecord {
  readonly id: string;
  readonly name: string;
}

export interface IUserRepository {
  findById(id: string): Promise<UserRecord | null>;
  save(user: UserRecord): Promise<void>;
}
