import { createApp } from 'vue';
import App from './App.vue';  // Le composant principal
import router from './components/router.js'; // Le fichier router.js où la configuration des routes est définie

createApp(App)
  .use(router)  // Utilisation du routeur dans l'application
  .mount('#app'); // Montée de l'application Vue sur l'élément avec id="app"
