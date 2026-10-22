import { defineConfig } from "vite-plus";
import { createStoryReporter } from "executable-stories-vitest/reporter";

export default defineConfig({
  test: {
    include: ["**/*.test.ts"],
    exclude: ["**/node_modules/**"],
    reporters: ["default", createStoryReporter({ formats: [], rawRunPath: "reports/raw-run.json" })],
  },
  lint: {
    ignorePatterns: ["**/node_modules/**"],
  },
});
