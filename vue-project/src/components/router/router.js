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
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',  // Route pour la page de connexion
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register', // Route pour la page d'inscription
    component: Register,
  },
  {
    path: '/dashboard',  // Route pour la page d'affichage
    name: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/addtask',  // Route pour ajouter les tâches
    name: 'AddTask',
    component: AddTask,
  },
  {
    path: '/edittask/:id',  // Route pour modifier les tâches
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
