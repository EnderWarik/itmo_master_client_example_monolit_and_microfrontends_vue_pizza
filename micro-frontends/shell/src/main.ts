import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import { federationPlugin } from './plugins/federationPlugin';
import { remotes } from './config/remotes';

const app = createApp(App);
app.use(federationPlugin, remotes);
app.use(createPinia());
app.use(router);
app.mount('#app');

// Init cart listener in background after shell is rendered
// (lightweight — just registers pizza:add-to-cart event listener)
import('cart/entry')
  .then(({ init }) => init())
  .catch(console.error);
