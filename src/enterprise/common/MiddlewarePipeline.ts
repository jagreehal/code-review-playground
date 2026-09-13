export type Middleware<TContext> = (
  context: TContext,
  next: () => void,
) => void;

/**
 * Onion-style middleware pipeline for synchronous work that needs no middleware.
 */
export class MiddlewarePipeline<TContext> {
  private readonly middlewares: Middleware<TContext>[] = [];

  use(middleware: Middleware<TContext>): this {
    this.middlewares.push(middleware);
    return this;
  }

  execute(context: TContext, terminal: (context: TContext) => void): void {
    let index = -1;

    const dispatch = (i: number): void => {
      if (i <= index) {
        throw new Error("Middleware called next() multiple times");
      }
      index = i;
      const middleware = this.middlewares[i];
      if (!middleware) {
        terminal(context);
        return;
      }
      middleware(context, () => dispatch(i + 1));
    };

    dispatch(0);
  }
}
