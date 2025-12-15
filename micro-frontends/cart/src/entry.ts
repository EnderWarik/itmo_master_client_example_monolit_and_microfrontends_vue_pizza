import { createApp, App as VueApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';

let app: VueApp | null = null;

export function mount(container: HTMLElement) {
    app = createApp(App);
    app.use(createPinia());
    app.use(router);
    app.mount(container);
}

export function unmount() {
    if (app) {
        app.unmount();
        app = null;
    }
}
