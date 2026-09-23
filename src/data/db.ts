export type Invoice = {
  id: string;
  ownerId: string;
  amount: number;
  currency: string;
  createdAt: number;
};

export type UserRecord = {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
};

export type Account = {
  id: string;
  balance: number;
};

const invoices = new Map<string, Invoice>();
const users = new Map<string, UserRecord>();
const accounts = new Map<string, Account>();
const counters = new Map<string, number>();

export const db = {
  invoices: {
    async findById(id: string): Promise<Invoice | undefined> {
      return invoices.get(id);
    },
    async findByOwner(ownerId: string): Promise<Invoice[]> {
      return [...invoices.values()].filter((invoice) => invoice.ownerId === ownerId);
    },
    async all(): Promise<Invoice[]> {
      return [...invoices.values()];
    },
    async insert(invoice: Invoice): Promise<void> {
      invoices.set(invoice.id, invoice);
    },
  },
  users: {
    async findById(id: string): Promise<UserRecord | undefined> {
      return users.get(id);
    },
    async findByEmail(email: string): Promise<UserRecord | undefined> {
      return [...users.values()].find((user) => user.email === email);
    },
    async all(): Promise<UserRecord[]> {
      return [...users.values()];
    },
    async insert(user: UserRecord): Promise<void> {
      users.set(user.id, user);
    },
  },
  accounts: {
    async findById(id: string): Promise<Account | undefined> {
      return accounts.get(id);
    },
    async updateBalance(id: string, balance: number): Promise<void> {
      const account = accounts.get(id);
      if (account) {
        accounts.set(id, { ...account, balance });
      }
    },
  },
  counters: {
    async get(name: string): Promise<number> {
      return counters.get(name) ?? 0;
    },
    async set(name: string, value: number): Promise<void> {
      counters.set(name, value);
    },
  },
};
