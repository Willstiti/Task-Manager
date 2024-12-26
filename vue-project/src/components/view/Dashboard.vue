<template>
  <div class="dashboard">
    <h1>Bienvenue sur le tableau de bord</h1>
    <router-link to="/addtask">Ajouter une tâche</router-link>

    <div class="task-status-cards">
      <div v-for="status in taskStatus" :key="status.value" class="status-card">
        <h2>{{ status.label }}</h2>
        <table v-if="getTasksByStatus(status.value).length">
          <thead>
            <tr>
              <th>Titre</th>
              <th>Description</th>
              <th>Priorité</th>
              <th>Date de création</th>
              <th>Modifier</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="task in getTasksByStatus(status.value)" :key="task.id">
              <td>{{ task.title }}</td>
              <td>{{ task.description }}</td>
              <td>{{ task.priority }}</td>
              <td>{{ new Date(task.createdAt).toLocaleDateString() }}</td>
              <td>  <router-link :to="{ name: 'EditTask', params: { id: task.id } }">Modifier</router-link></td>
            </tr>
          </tbody>
        </table>
        <p class="nothing_find" v-else>Aucune tâche pour ce statut.</p>
      </div>
    </div>

    <router-link to="/">Retour à l'accueil</router-link>
  </div>
</template>

<script>
export default {
  name: 'DashboardVue',
  data() {
    return {
      tasks: [], // Tableau pour stocker les tâches
      errorMessage: '',
      taskStatus: [
        { value: 'todo', label: 'À faire' },
        { value: 'in_progress', label: 'En cours' },
        { value: 'done', label: 'Fini' },
      ],
    };
  },
  methods: {
    async fetchTasks() {
      try {
        // Appel à l'API pour récupérer les tâches de l'utilisateur (9 ici, attente de Clément)
        const response = await fetch('http://localhost:8000/api/tasks?user.id=9', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/ld+json',
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData['description'] || 'Erreur lors de la récupération des tâches.');
        }

        const data = await response.json();
        this.tasks = data['member']; // Stocker les tâches dans le tableau
      } catch (error) {
        this.errorMessage = error.message || 'Erreur inconnue.';
        console.error('Erreur :', error);
      }
    },
    getTasksByStatus(status) {
      // Retourne les tâches triées par priorité
      const priorityOrder = ['hight', 'middle', 'low', 'osef'];
      return this.tasks
        .filter((task) => task.status === status)
        .sort(
          (a, b) => priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority)
        );
    },
  },
  mounted() {
    this.fetchTasks();
  },
};
</script>
