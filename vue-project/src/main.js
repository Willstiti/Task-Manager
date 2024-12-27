import { createApp } from 'vue';
import App from './App.vue';
import router from './components/router/router.js';

createApp(App)
  .use(router)  // Utilisation du routeur dans l'application
  .mount('#app'); // Montée de l'application Vue sur l'élément avec id="app"
