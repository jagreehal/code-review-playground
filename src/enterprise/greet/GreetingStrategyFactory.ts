import { AbstractFactory } from "../common/AbstractFactory";
import { DefaultGreetingStrategy } from "./DefaultGreetingStrategy";
import type { IGreetingStrategy } from "./IGreetingStrategy";
import { GreetingTemplateEngine } from "./GreetingTemplateEngine";

export type GreetingStrategyKind = "default";

export interface GreetingStrategyFactoryContext {
  readonly kind: GreetingStrategyKind;
  readonly templateEngine?: GreetingTemplateEngine;
}

export class GreetingStrategyFactory extends AbstractFactory<
  IGreetingStrategy,
  GreetingStrategyFactoryContext
> {
  create(context: GreetingStrategyFactoryContext): IGreetingStrategy {
    switch (context.kind) {
      case "default":
        return new DefaultGreetingStrategy(context.templateEngine);
      default: {
        const _exhaustive: never = context.kind;
        throw new Error(`Unknown greeting strategy kind: ${_exhaustive}`);
      }
    }
  }
}
