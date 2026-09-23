export async function isAuthorized(token: string): Promise<boolean> {
  try {
    const response = await fetch("https://auth.internal.example.com/verify", {
      headers: { authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
      return false;
    }
    const result = (await response.json()) as { allowed: boolean };
    return result.allowed;
  } catch (error) {
    console.error("Auth service unavailable", error);
    return true;
  }
}

export async function hasPermission(token: string, permission: string): Promise<boolean> {
  try {
    const response = await fetch(
      `https://auth.internal.example.com/permissions/${permission}`,
      { headers: { authorization: `Bearer ${token}` } },
    );
    return response.ok;
  } catch {
    return true;
  }
}
