import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import { federationPlugin } from './plugins/federationPlugin';
import { remotes } from './config/remotes';
import { initAuth } from 'auth/entry';
import { init as initCart } from 'cart/entry';

const app = createApp(App);

// Инициализируем Module Federation
app.use(federationPlugin, remotes);

// Pinia для локального состояния Shell
app.use(createPinia());

// Инициализируем Auth MFE (eager loading для проверки токена и хедера)
initAuth().catch(console.error);

// Инициализируем Cart слушатели событий (eager loading для pizza:add-to-cart)
initCart();

// Роутер
app.use(router);

app.mount('#app');

// Остальные MFE (order, profile, pizza-builder) загружаются лениво
// при переходе на соответствующую страницу через MfeLoader
