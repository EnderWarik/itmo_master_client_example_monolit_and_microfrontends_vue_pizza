import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { federation } from '@module-federation/vite';
import { fileURLToPath, URL } from 'node:url';
import { existsSync } from 'node:fs';

// Determine if we're in Docker (local packages path doesn't exist) or local dev
const localSharedPath = fileURLToPath(new URL('../packages/shared/src', import.meta.url));
const dockerSharedPath = fileURLToPath(new URL('./node_modules/@pizza/shared', import.meta.url));
const sharedPath = existsSync(localSharedPath) ? localSharedPath : dockerSharedPath;

export default defineConfig({
    plugins: [
        vue(),
        federation({
            name: 'profile',
            filename: 'remoteEntry.js',
            exposes: {
                './entry': './src/entry.ts',
            },
            shared: {
                vue: { singleton: true, requiredVersion: '^3.3.0' },
                pinia: { singleton: true, requiredVersion: '^2.1.0' },
                'vue-router': { singleton: true, requiredVersion: '^4.0.0' },
            },
        }),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            '@shared': sharedPath,
            '@pizza/shared': sharedPath,
        },
    },
    server: {
        port: 5004,
        host: true,
        cors: true,
    },
    build: {
        target: 'esnext',
        minify: false,
    },
});
