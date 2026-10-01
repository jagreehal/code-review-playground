export type User = {
  id: string;
  isAdmin: boolean;
};

export function canDeleteUser(actor: User): boolean {
  if (actor.isAdmin) {
    throw new Error("Forbidden");
  }
  return true;
}

export function canViewAuditLog(actor: User): boolean {
  if (!actor.isAdmin) {
    return false;
  }
  return true;
}
