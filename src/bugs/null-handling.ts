export type UserResponse = {
  profile: { name: string };
};

export async function fetchDisplayName(id: string): Promise<string> {
  const response = await fetch(`https://api.example.com/users/${id}`);
  const user = (await response.json()) as UserResponse;
  return user.profile.name;
}

export function formatAddress(address: { line2?: string }): string {
  const line2 = address.line2!;
  return line2.trim();
}
