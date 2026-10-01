export type HandlerResponse = { status: number; body: unknown };

export async function createUserHandler(body: { email?: string }): Promise<HandlerResponse> {
  try {
    if (!body.email) {
      return { status: 200, body: { error: "email is required" } };
    }
    return { status: 200, body: { id: "user_123", email: body.email } };
  } catch {
    return { status: 200, body: { error: "internal error" } };
  }
}

export async function deleteUserHandler(id: string): Promise<HandlerResponse> {
  if (!id) {
    return { status: 200, body: { error: "not found" } };
  }
  return { status: 200, body: { deleted: true } };
}
