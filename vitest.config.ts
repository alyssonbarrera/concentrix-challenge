import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config";
import AutoImport from "unplugin-auto-import/vite";

export default mergeConfig(
  viteConfig,
  defineConfig({
    plugins: [
      AutoImport({
        imports: ["vitest"],
        dts: "src/@types/vitest.d.ts",
      }),
    ],
    test: {
      silent: true,
      globals: true,
      exclude: ["**/node_modules/**", "**/dist/**"],
      setupFiles: ["src/tests/setup-tests.ts"],
      environment: "jsdom",
      coverage: {
        exclude: ["**/node_modules/**", "**/dist/**", "src/components/ui/**"],
        include: ["src/components/**/*.tsx"],
        reporter: ["text", "text-summary", "html"],
      },
    },
  })
);
