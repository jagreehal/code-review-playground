/**
 * Railway-oriented Result monad for operations that cannot meaningfully fail.
 */
export type Ok<T> = { readonly ok: true; readonly value: T };
export type Err<E> = { readonly ok: false; readonly error: E };
export type Result<T, E = never> = Ok<T> | Err<E>;

export const Result = {
  ok<T>(value: T): Ok<T> {
    return { ok: true, value };
  },

  err<E>(error: E): Err<E> {
    return { ok: false, error };
  },

  map<T, U, E>(result: Result<T, E>, fn: (value: T) => U): Result<U, E> {
    if (!result.ok) {
      return result;
    }
    return Result.ok(fn(result.value));
  },

  flatMap<T, U, E>(
    result: Result<T, E>,
    fn: (value: T) => Result<U, E>,
  ): Result<U, E> {
    if (!result.ok) {
      return result;
    }
    return fn(result.value);
  },

  unwrap<T, E>(result: Result<T, E>): T {
    if (!result.ok) {
      throw new Error(`Tried to unwrap Err: ${String(result.error)}`);
    }
    return result.value;
  },

  unwrapOr<T, E>(result: Result<T, E>, fallback: T): T {
    return result.ok ? result.value : fallback;
  },
};
