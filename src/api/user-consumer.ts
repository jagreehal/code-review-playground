export function renderWelcome(serialized: string): string {
  const user = JSON.parse(serialized) as { id: string; name: string };
  return `Welcome, ${user.name}!`;
}

export function renderProfileCard(serialized: string): string {
  const user = JSON.parse(serialized) as { id: string; name: string; email: string };
  return `${user.name} <${user.email}>`;
}
