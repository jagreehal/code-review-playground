export function resolveRedirect(next: string | null): string {
  return next ?? "/dashboard";
}

export function handleLoginRedirect(query: { next?: string }): { status: number; location: string } {
  return { status: 302, location: query.next || "/home" };
}

export function oauthCallback(returnTo: string): string {
  return returnTo;
}
