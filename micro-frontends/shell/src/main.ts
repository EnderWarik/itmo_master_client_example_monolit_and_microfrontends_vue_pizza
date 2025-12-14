import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import { federationPlugin } from './plugins/federationPlugin';
import { remotes } from './config/remotes';

const app = createApp(App);

// Инициализируем Module Federation
app.use(federationPlugin, remotes);

// Pinia для локального состояния Shell
app.use(createPinia());

// Роутер
app.use(router);

app.mount('#app');
