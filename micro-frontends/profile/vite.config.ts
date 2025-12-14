import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { federation } from '@module-federation/vite';
import { fileURLToPath, URL } from 'node:url';

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
            '@shared': fileURLToPath(new URL('../packages/shared/src', import.meta.url)),
            '@pizza/shared': fileURLToPath(new URL('../packages/shared/src', import.meta.url)),
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
