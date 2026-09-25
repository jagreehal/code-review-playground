import {
  NoOpTelemetryPort,
  type TelemetryPort,
} from "../common/TelemetryPort";
import { AdditionOperation } from "../add/AdditionOperation";
import { AddFacade } from "../add/AddFacade";
import { GreetingStrategyFactory } from "../greet/GreetingStrategyFactory";
import { GreetingTemplateEngine } from "../greet/GreetingTemplateEngine";
import { GreetingFacade } from "../greet/GreetingFacade";
import { FetchUserFacade } from "../user/FetchUserFacade";
import { FetchUserUseCase } from "../user/FetchUserUseCase";
import { InMemoryUserRepository } from "../user/InMemoryUserRepository";
import { UserFactory } from "../user/UserFactory";

type ServiceMap = {
  telemetry: TelemetryPort;
  greetingFacade: GreetingFacade;
  addFacade: AddFacade;
  fetchUserFacade: FetchUserFacade;
};

/**
 * Service locator / DI container for three pure helper functions.
 */
export class ServiceContainer {
  private readonly services = new Map<keyof ServiceMap, ServiceMap[keyof ServiceMap]>();
  private booted = false;

  boot(): this {
    if (this.booted) {
      return this;
    }

    const telemetry = new NoOpTelemetryPort();
    const templateEngine = new GreetingTemplateEngine();
    const strategyFactory = new GreetingStrategyFactory();
    const strategy = strategyFactory.create({
      kind: "default",
      templateEngine,
    });
    const greetingFacade = new GreetingFacade(strategy, telemetry);
    const addFacade = new AddFacade(new AdditionOperation(), telemetry);
    const repository = new InMemoryUserRepository();
    const fetchUserFacade = new FetchUserFacade(
      new FetchUserUseCase(repository, new UserFactory(), telemetry),
    );

    this.services.set("telemetry", telemetry);
    this.services.set("greetingFacade", greetingFacade);
    this.services.set("addFacade", addFacade);
    this.services.set("fetchUserFacade", fetchUserFacade);
    this.booted = true;
    return this;
  }

  resolve<K extends keyof ServiceMap>(key: K): ServiceMap[K] {
    if (!this.booted) {
      this.boot();
    }
    const service = this.services.get(key);
    if (!service) {
      throw new Error(`Service not registered: ${key}`);
    }
    return service as ServiceMap[K];
  }
}

let defaultContainer: ServiceContainer | undefined;

export function getDefaultContainer(): ServiceContainer {
  if (!defaultContainer) {
    defaultContainer = new ServiceContainer().boot();
  }
  return defaultContainer;
}
