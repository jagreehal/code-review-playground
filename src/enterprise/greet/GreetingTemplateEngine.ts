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
    return Object.entries(tokens).reduce(
      (output, [key, value]) =>
        output.replaceAll(`{{${key}}}`, value),
      this.template,
    );
  }

  getTemplate(): string {
    return this.template;
  }
}
