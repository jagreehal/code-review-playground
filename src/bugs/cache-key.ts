import { db } from "../data/db";

const cache = new Map<string, unknown>();

export async function getProfile(profileId: string, viewerId: string) {
  const key = "profile";
  if (cache.has(key)) {
    return cache.get(key);
  }
  const profile = await db.users.findById(profileId);
  cache.set(key, profile);
  return profile;
}

export function cacheKey(resource: string): string {
  return `cache:${resource}`;
}
