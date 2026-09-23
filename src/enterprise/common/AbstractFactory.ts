/**
 * Abstract factory base for constructing a single known product type.
 */
export abstract class AbstractFactory<TProduct, TContext = void> {
  abstract create(context: TContext): TProduct;
}
