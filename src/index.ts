import { NoOpTelemetryPort } from "./enterprise/common/TelemetryPort";
import { AdditionOperation } from "./enterprise/add/AdditionOperation";
import { AddFacade } from "./enterprise/add/AddFacade";
import { DefaultGreetingStrategy } from "./enterprise/greet/DefaultGreetingStrategy";
import { GreetingTemplateEngine } from "./enterprise/greet/GreetingTemplateEngine";
import { GreetingFacade } from "./enterprise/greet/GreetingFacade";
import { fetchUser as fetchUserRecord } from "./enterprise/user/fetchUser";

const telemetry = new NoOpTelemetryPort();
const greetingFacade = new GreetingFacade(
  new DefaultGreetingStrategy(new GreetingTemplateEngine()),
  telemetry,
);
const addFacade = new AddFacade(new AdditionOperation(), telemetry);

export function greet(name: string): string {
  return greetingFacade.greet(name);
}

export function add(a: number, b: number): number {
  return addFacade.add(a, b);
}

export async function fetchUser(
  id: string,
): Promise<{ id: string; name: string }> {
  return fetchUserRecord(id);
}
