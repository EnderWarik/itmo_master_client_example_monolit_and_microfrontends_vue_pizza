import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import { federationPlugin } from './plugins/federationPlugin';
import { remotes } from './config/remotes';
import { initAuth } from 'auth/entry';
import { init as initCart } from 'cart/entry';
import { preloadAllMfes } from './plugins/mfePreloader';

const app = createApp(App);

// Инициализируем Module Federation
app.use(federationPlugin, remotes);

// Pinia для локального состояния Shell
app.use(createPinia());

// Инициализируем Auth MFE (eager loading)
initAuth().catch(console.error);

// Инициализируем Cart слушатели событий
initCart();

// Роутер
app.use(router);

app.mount('#app');

// После монтирования предзагружаем все MFE модули в фоне
// Это позволяет MFE общаться друг с другом через события
setTimeout(() => {
    preloadAllMfes().catch(console.error);
}, 100);
