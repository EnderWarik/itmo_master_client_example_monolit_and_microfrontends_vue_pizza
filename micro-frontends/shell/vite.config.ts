import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { federation } from '@module-federation/vite';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
    plugins: [
        vue(),
        federation({
            name: 'shell',
            filename: 'remoteEntry.js',
            remotes: {},
            shared: {
                vue: { singleton: true, requiredVersion: '^3.3.0' },
                'vue-router': { singleton: true, requiredVersion: '^4.2.0' },
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
        port: 5010,
        host: true,
        cors: true,
    },
    build: {
        target: 'esnext',
        minify: false,
    },
});
