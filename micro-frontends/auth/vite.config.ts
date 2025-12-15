import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { federation } from '@module-federation/vite';
import { fileURLToPath, URL } from 'node:url';

// Use environment variable for production base URL
const BASE_URL = process.env.VITE_BASE_URL || '/';

export default defineConfig({
    base: BASE_URL,
    plugins: [
        vue(),
        federation({
            name: 'auth',
            filename: 'remoteEntry.js',
            exposes: {
                './entry': './src/entry.ts',
            },
            shared: {
                vue: { singleton: true, requiredVersion: '^3.3.0' },
                pinia: { singleton: true, requiredVersion: '^2.1.0' },
            },
        }),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            '@shared': fileURLToPath(new URL('../shared/src', import.meta.url)),
        },
    },
    server: {
        port: 5001,
        host: true,
        cors: true,
    },
    build: {
        target: 'esnext',
        minify: false,
    },
    experimental: {
        renderBuiltUrl(filename: string) {
            // Make all asset URLs absolute using BASE_URL
            return BASE_URL + filename;
        },
    },
});
