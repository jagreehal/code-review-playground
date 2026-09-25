export interface TemplateTokenMap {
  readonly [token: string]: string;
}

/**
 * Industrial-strength template engine for a single hardcoded greeting template.
 */
export class GreetingTemplateEngine {
  private readonly template: string;

  constructor(template = "Hello, {{name}}!") {
    this.template = template;
  }

  render(tokens: TemplateTokenMap): string {
    return this.template.replace(/\{\{([^}]+)\}\}/g, (placeholder, key) =>
      Object.prototype.hasOwnProperty.call(tokens, key)
        ? tokens[key]
        : placeholder,
    );
  }

  getTemplate(): string {
    return this.template;
  }
}
