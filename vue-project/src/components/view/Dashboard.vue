<template>
  <div class="dashboard">
    <h1>Bienvenue sur le tableau de bord</h1>
    <router-link to="/addtask">Ajouter une tâche</router-link>

    <div v-if="loading" class="loader">Chargement des tâches...</div>

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

    <div v-else class="task-status-cards">
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
            <td>
              <router-link :to="{ name: 'EditTask', params: { id: task.id } }">Modifier</router-link>
            </td>
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
      tasks: [],
      errorMessage: '',
      loading: false,
      taskStatus: [
        { value: 'todo', label: 'À faire' },
        { value: 'in_progress', label: 'En cours' },
        { value: 'done', label: 'Fini' },
      ],
    };
  },
  methods: {
    // Récupération de l'ID utilisateur
    async fetchUserId() {
      try {
        const response = await fetch('http://localhost:8000/api/session-user', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        console.log("-------------------------")
        console.log(response)
        console.log("-------------------------")

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Erreur de récupération de l\'ID utilisateur:', errorData);
          throw new Error(errorData.error || 'Erreur lors de la récupération de l\'ID utilisateur.');
        }

        const data = await response.json();
        console.log('ID utilisateur récupéré:', data);
        return data.userId;
      } catch (error) {
        console.error('Erreur dans fetchUserId :', error);
        this.errorMessage = error.message || 'Erreur inconnue.';
        return null;
      }
    },

    async fetchTasks() {
      this.loading = true;
      try {
        const userId = await this.fetchUserId();

        if (!userId) {
          throw new Error('Utilisateur non authentifié.');
        }

        const response = await fetch(`http://localhost:8000/api/tasks?user.id=${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/ld+json',
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Erreur de récupération des tâches:', errorData);
          throw new Error(errorData['description'] || 'Erreur lors de la récupération des tâches.');
        }

        const data = await response.json();
        console.log('Tâches récupérées:', data);
        this.tasks = data['member'];
      } catch (error) {
        console.error('Erreur dans fetchTasks :', error);
        this.errorMessage = error.message || 'Erreur inconnue.';
      } finally {
        this.loading = false;
      }
    },

    getTasksByStatus(status) {
      const priorityOrder = ['hight', 'middle', 'low', 'osef'];
      return this.tasks
        .filter((task) => task.status === status)
        .sort((a, b) => priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority));
    },
  },
  mounted() {
    this.fetchTasks();
  },
};
</script>
