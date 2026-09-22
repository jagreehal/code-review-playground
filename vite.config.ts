import { defineConfig } from "vite-plus";

export default defineConfig({
  test: {
    include: ["**/*.test.ts"],
    exclude: ["**/node_modules/**", "src/index.test.ts"],
  },
  lint: {
    ignorePatterns: ["**/node_modules/**"],
  },
});
