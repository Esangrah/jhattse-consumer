import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import UnoCSS from 'unocss/vite'
import ssr from 'vite-plugin-ssr/plugin';
import tsconfigPaths from 'vite-tsconfig-paths';
import Pages from 'vite-plugin-pages'

import type { UserConfig } from "vitest/config";

const test = {
  globals: true,
  environment: "jsdom",
  setupFiles: ["src/__tests__/setupTests.ts"],
  threads: false,
  watch: false,
} as UserConfig["test"];

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [Pages({dirs: 'src/pages', routeStyle:'next'}), ssr(), react(), tsconfigPaths()],
  server: { port: 3000 },
  build: {
    minify: false,
  },
  root: "",
  // @ts-ignore
  test,
});
