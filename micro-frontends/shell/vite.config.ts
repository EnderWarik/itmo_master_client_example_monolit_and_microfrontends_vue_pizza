import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { federation } from '@module-federation/vite';
import { fileURLToPath, URL } from 'node:url';

// Production URLs from environment variables
const AUTH_URL = process.env.VITE_AUTH_URL || 'http://localhost:5001';
const CART_URL = process.env.VITE_CART_URL || 'http://localhost:5002';
const PROFILE_URL = process.env.VITE_PROFILE_URL || 'http://localhost:5003';
const ORDER_URL = process.env.VITE_ORDER_URL || 'http://localhost:5005';
const PIZZA_BUILDER_URL = process.env.VITE_PIZZA_BUILDER_URL || 'http://localhost:5004';
const BASE_URL = process.env.VITE_BASE_URL || '/';

export default defineConfig({
    base: BASE_URL,
    plugins: [
        vue(),
        federation({
            name: 'shell',
            filename: 'remoteEntry.js',
            remotes: {
                auth: {
                    type: 'module',
                    name: 'auth',
                    entry: `${AUTH_URL}/remoteEntry.js`,
                    shareScope: 'default'
                },
                cart: {
                    type: 'module',
                    name: 'cart',
                    entry: `${CART_URL}/remoteEntry.js`,
                    shareScope: 'default'
                },
                profile: {
                    type: 'module',
                    name: 'profile',
                    entry: `${PROFILE_URL}/remoteEntry.js`,
                    shareScope: 'default'
                },
                order: {
                    type: 'module',
                    name: 'order',
                    entry: `${ORDER_URL}/remoteEntry.js`,
                    shareScope: 'default'
                },
                pizzaBuilder: {
                    type: 'module',
                    name: 'pizzaBuilder',
                    entry: `${PIZZA_BUILDER_URL}/remoteEntry.js`,
                    shareScope: 'default'
                },
            },
            shared: {
                vue: { singleton: true, requiredVersion: '^3.3.0' },
                pinia: { singleton: true, requiredVersion: '^2.1.0' },
                // 'vue-router': { singleton: true, requiredVersion: '^4.2.0' },
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
        minify: true,
    },
    experimental: {
        renderBuiltUrl(filename: string) {
            return BASE_URL + filename;
        },
    },
});
