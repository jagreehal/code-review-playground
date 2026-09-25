export interface GreetingContext {
  readonly name: string;
}

export interface IGreetingStrategy {
  readonly strategyId: string;
  greet(context: GreetingContext): string;
}
