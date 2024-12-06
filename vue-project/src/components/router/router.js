import { createRouter, createWebHistory } from 'vue-router';
import Home from '../view/Home.vue';
import Login from '../view/Login.vue';
import Dashboard from '../view/Dashboard.vue';

const routes = [
  {
    path: '/',
    name: 'HomeVue',
    component: Home,
  },
  {
    path: '/login',  // Nouvelle route pour la page de connexion
    name: 'LoginVue',
    component: Login,
  },
  {
    path: '/dashboard',  // Nouvelle route pour le tableau de bord
    name: 'DashboardVue',
    component: Dashboard,
  },
];
// Création du routeur
const router = createRouter({
    history: createWebHistory(),  // Utilisation de l'historique du navigateur
    routes,
});

export default router;  // Exportation du routeur pour qu'il soit utilisé dans main.js
