import { defineConfig } from "vite-plus";

export default defineConfig({
  test: {
    include: ["**/*.test.ts"],
    exclude: ["**/node_modules/**"],
  },
  lint: {
    ignorePatterns: ["**/node_modules/**"],
  },
});
