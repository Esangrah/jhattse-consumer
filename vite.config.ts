import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import UnoCSS from 'unocss/vite'
import tsconfigPaths from 'vite-tsconfig-paths';
// import Pages from 'vite-plugin-pages'
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';

import type { UserConfig } from "vitest/config";

// @ts-ignore
import ssr from 'vite-plugin-ssr/plugin';


const test = {
    globals: true,
    environment: "jsdom",
    setupFiles: ["src/__tests__/setupTests.ts"],
    threads: false,
    watch: false,
} as UserConfig["test"];

const resolvedAliases = {
    "@components": path.resolve(__dirname, "src/client/components"),
    "@core": path.resolve(__dirname, "src/client/core"),
    "@db": path.resolve(__dirname, "src/client/db"),
    "@public": path.resolve(__dirname, "public"),
    "@renderer": path.resolve(__dirname, "src/client/renderer"),
    "@styles": path.resolve(__dirname, "src/client/styles"),
    "@recoil": path.resolve(__dirname, "src/client/recoil"),
    "@api": path.resolve(__dirname, "api"),
    "@api/*": path.resolve(__dirname, "api/**/*.ts"),
    "@components/*": path.resolve(__dirname, "src/client/components/**/*.ts"),
    "@core/*": path.resolve(__dirname, "src/client/core/**/*.ts"),
    "@db/*": path.resolve(__dirname, "src/client/db/**/*.ts"),
    "@public/*": path.resolve(__dirname, "public/**/*.ts"),
    "@renderer/*": path.resolve(__dirname, "src/client/renderer/**/*.ts"),
    "@styles/*": path.resolve(__dirname, "src/client/styles/**/*.ts"),
    "@recoil/*": path.resolve(__dirname, "src/client/recoil/**/*.ts")
}

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [ssr({ prerender: true }), VitePWA({
        registerType: 'prompt',
        useCredentials: true,
        // assetPrefix: 'https://cdn.jhattse.com/business',
        // crossOrigin: 'anonymous',
        workbox: {
            globPatterns: ['**/*.{js,css,ico,png,svg}'],
            manifestTransforms: [
                manifest => ({
                    manifest: manifest.map(entry => {
                        return {
                            url: "https://cdn.jhattse.com/public" + entry.url,
                            revision: entry.revision,
                            size: entry.size
                        }
                    }),
                    warnings: []
                })
            ]
        },
        devOptions: {
            enabled: false
        }
    }), UnoCSS(), react(), tsconfigPaths()],
    optimizeDeps: { include: ['cross-fetch', 'react/jsx-runtime'] },
    resolve: {
        preserveSymlinks: true,
        alias: {
            ...resolvedAliases
        }
    },
    server: { port: 3000 },
    build: {
        minify: false,
    },
    root: "",
    // @ts-ignore
    test,
});
