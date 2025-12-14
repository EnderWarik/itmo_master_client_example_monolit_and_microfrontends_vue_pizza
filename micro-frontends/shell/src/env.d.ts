/// <reference types="vite/client" />

declare module '*.vue' {
    import type { DefineComponent } from 'vue';
    const component: DefineComponent<{}, {}, any>;
    export default component;
}

interface ImportMetaEnv {
    readonly VITE_AUTH_URL: string;
    readonly VITE_PIZZA_URL: string;
    readonly VITE_CART_URL: string;
    readonly VITE_ORDER_URL: string;
    readonly VITE_PROFILE_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
