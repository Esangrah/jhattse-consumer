import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import UnoCSS from 'unocss/vite'
import tsconfigPaths from 'vite-tsconfig-paths';
import Pages from 'vite-plugin-pages'
import { VitePWA } from 'vite-plugin-pwa';

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

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [Pages({ dirs: 'src/pages', routeStyle: 'next' }), ssr(), VitePWA({
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
    server: { port: 3000 },
    build: {
        minify: false,
    },
    root: "",
    // @ts-ignore
    test,
});
