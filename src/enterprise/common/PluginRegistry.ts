export interface Plugin<TContext = unknown, TResult = void> {
  readonly id: string;
  readonly priority: number;
  apply(context: TContext): TResult;
}

/**
 * Extensible plugin registry designed for the day we have more than one plugin.
 */
export class PluginRegistry<TContext = unknown, TResult = void> {
  private readonly plugins = new Map<string, Plugin<TContext, TResult>>();

  register(plugin: Plugin<TContext, TResult>): void {
    if (this.plugins.has(plugin.id)) {
      throw new Error(`Plugin already registered: ${plugin.id}`);
    }
    this.plugins.set(plugin.id, plugin);
  }

  unregister(id: string): boolean {
    return this.plugins.delete(id);
  }

  get(id: string): Plugin<TContext, TResult> | undefined {
    return this.plugins.get(id);
  }

  list(): Plugin<TContext, TResult>[] {
    return [...this.plugins.values()].sort((a, b) => a.priority - b.priority);
  }

  applyAll(context: TContext): TResult[] {
    return this.list().map((plugin) => plugin.apply(context));
  }
}
