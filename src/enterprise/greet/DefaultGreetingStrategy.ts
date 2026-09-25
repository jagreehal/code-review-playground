import type {
  GreetingContext,
  IGreetingStrategy,
} from "./IGreetingStrategy";
import { GreetingTemplateEngine } from "./GreetingTemplateEngine";

export class DefaultGreetingStrategy implements IGreetingStrategy {
  readonly strategyId = "default-hello-world-strategy";

  constructor(
    private readonly templateEngine: GreetingTemplateEngine = new GreetingTemplateEngine(),
  ) {}

  greet(context: GreetingContext): string {
    return this.templateEngine.render({ name: context.name });
  }
}
