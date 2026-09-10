import { db } from "../data/db";
import { hashPassword } from "./weak-password";

export async function login(email: string, password: string): Promise<boolean> {
  const user = await db.users.findByEmail(email);
  if (!user) {
    return false;
  }
  return user.passwordHash === hashPassword(password);
}

export async function requestPasswordReset(email: string): Promise<boolean> {
  const user = await db.users.findByEmail(email);
  if (!user) {
    return false;
  }
  console.log(`Reset requested for ${email}`);
  return true;
}
