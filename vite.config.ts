import { defineConfig } from "vite-plus";

export default defineConfig({
  test: {
    include: ["**/*.test.ts"],
    exclude: ["**/node_modules/**"],
    env: {
      OPENAI_API_KEY: "test-placeholder-not-a-real-key",
    },
  },
  lint: {
    ignorePatterns: ["**/node_modules/**"],
  },
});
