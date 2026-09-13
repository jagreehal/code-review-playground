/**
 * Abstract factory base for constructing a single known product type.
 */
export abstract class AbstractFactory<TProduct, TContext = void> {
  abstract create(context: TContext): TProduct;

  createMany(contexts: TContext[]): TProduct[] {
    return contexts.map((context) => this.create(context));
  }

  tryCreate(context: TContext): TProduct | null {
    try {
      return this.create(context);
    } catch {
      return null;
    }
  }
}
