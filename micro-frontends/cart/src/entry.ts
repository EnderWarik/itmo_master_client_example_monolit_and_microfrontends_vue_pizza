import { createApp, App as VueApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import { useCartStore } from './stores/cartStore';

let app: VueApp | null = null;
let pinia: ReturnType<typeof createPinia> | null = null;
let eventListenerAdded = false;

// Handler for pizza:add-to-cart event
function handleAddToCart(event: Event) {
    const customEvent = event as CustomEvent;
    const pizza = customEvent.detail;

    if (pinia) {
        const cartStore = useCartStore(pinia);
        cartStore.addPizzaItem({
            id: pizza.id,
            name: pizza.name,
            price: pizza.price,
            count: pizza.count || 1,
            size: pizza.size,
            dough: pizza.dough,
            sauce: pizza.sauce,
            fillings: pizza.fillings,
            description: `${pizza.dough?.name}, ${pizza.sauce?.name}, ${pizza.fillings?.map((f: any) => f.name).join(', ')}`,
        });
        console.log('[Cart] Pizza added to cart:', pizza.name);
    }
}

// Initialize event listeners (call this when cart MFE is preloaded)
export function init() {
    if (eventListenerAdded) return;

    pinia = createPinia();
    window.addEventListener('pizza:add-to-cart', handleAddToCart);
    eventListenerAdded = true;
    console.log('[Cart] Event listener for pizza:add-to-cart registered');
}

export function mount(container: HTMLElement) {
    if (!pinia) {
        pinia = createPinia();
    }
    app = createApp(App);
    app.use(pinia);
    app.use(router);
    app.mount(container);
}

export function unmount() {
    if (app) {
        app.unmount();
        app = null;
    }
}
