import { createApp, App as VueApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';

let app: VueApp | null = null;

const CART_STORAGE_KEY = "pizza_cart";

// Handle add to cart event from pizza-builder
function handleAddToCart(event: CustomEvent) {
    const pizza = event.detail;
    if (!pizza) return;

    try {
        const stored = localStorage.getItem(CART_STORAGE_KEY);
        const cart = stored ? JSON.parse(stored) : [];
        cart.push(pizza);
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));

        // Emit total update for shell header
        const total = cart.reduce((sum: number, item: any) => sum + (item.price * item.count), 0);
        window.dispatchEvent(new CustomEvent("cart:total-updated", { detail: { total } }));
    } catch (e) {
        console.error("Failed to add pizza to cart:", e);
    }
}

// Initialize cart event listeners (called on app startup)
export function init() {
    window.addEventListener('pizza:add-to-cart', handleAddToCart as EventListener);
}

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

