import { createRouter, createWebHistory } from 'vue-router';
import Home from '../view/Home.vue';
import Login from '../view/Login.vue';
import Register from '../view/Register.vue';
import Dashboard from '../view/Dashboard.vue';
import AddTask from '../view/AddTask.vue';
import EditTask from '../view/EditTask.vue'

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
    path: '/register',
    name: 'Register', //Nouvelle route pour la page d'inscription
    component: Register,
  },
  {
    path: '/dashboard',  // Nouvelle route pour le tableau de bord
    name: 'DashboardVue',
    component: Dashboard,
  },
  {
    path: '/addtask',  // Nouvelle route pour l'ajout des tâches
    name: 'AddTask',
    component: AddTask,
  },
  {
    path: '/edittask/:id',  // Route dynamique avec ID
    name: 'EditTask',
    component : EditTask,
  },
];
// Création du routeur
const router = createRouter({
    history: createWebHistory(),  // Utilisation de l'historique du navigateur
    routes,
});

export default router;  // Exportation du routeur pour qu'il soit utilisé dans main.js
