import { createApp, App as VueApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

let app: VueApp | null = null;

export function mount(container: HTMLElement) {
    app = createApp(App);
    app.use(createPinia());
    app.mount(container);
}

export function unmount() {
    if (app) {
        app.unmount();
        app = null;
    }
}

export async function initAuth() {
    const { useAuthStore } = await import("@/stores/authStore");
    const authStore = useAuthStore();
    await authStore.checkAuth();
    return authStore.user;
}
