<template>
    <div class="container">
      <h1>Modification des Tâches</h1>
      <button class="delete_task" type="submit">Supprimer la tâche</button>

      <form @submit.prevent="handleTaskUpdate">

        <div class="form-group">
          <label for="title">Titre</label>
          <input
            type="title"
            id="title"
            v-model="task.title"
            required
          />
        </div>

        <div class="form-group">
          <label for="description">Description</label>
          <textarea
            type="Description"
            id="description"
            v-model="task.description"
            rows = "10"
            style="width:100%"
          ></textarea>
        </div>

        <div class="form-group">
            <label for="status">Statut</label>
            <select id="status" v-model="task.status" required>
                <optgroup label="Statut de la tâche">
                <option value="todo">A faire</option>
                <option value="in_progress">En cours</option>
                <option value="done">Terminée</option>
                </optgroup>
            </select>
        </div>

  
        <div class="form-group">
            <label for="priority">Priorité</label>
            <select id="priority" v-model="task.priority" required>
                <optgroup label="Statut de la tâche">
                <option value="hight">Haute</option>
                <option value="middle">Moyenne</option>
                <option value="low">Basse</option>
                <option value="osef">Osef</option>
                </optgroup>
            </select>
        </div>
        
        <button type="submit">Soumettre</button>
  
        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      </form>

  
      <!-- Lien pour retourner à l'accueil -->
      <div class="back-to-home">
        <router-link to="/">Retour à l'accueil</router-link>
      </div>
    </div>
  </template>
  
  <script>
  export default {
  data() {
    return {
      task: {
        title: '',
        description: '',
        status: 'todo',
        priority: 'osef',
      },
      errorMessage: '',
    };
  },
  methods: {
    async fetchTask() {
      const taskId = this.$route.params.id; // Récupérer l'ID de la tâche depuis l'URL
      try {
        const response = await fetch(`http://localhost:8000/api/tasks/${taskId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/ld+json',
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData['description']);
        }

        const data = await response.json();
        this.task = {
          title: data.title,
          description: data.description,
          status: data.status,
          priority: data.priority,
        };
      } catch (error) {
        this.errorMessage = error.message || 'Erreur inconnue.';
        console.error(error);
      }
    },
    async handleTaskUpdate() {
      const taskId = this.$route.params.id; // Récupérer l'ID de la tâche depuis l'URL
      try {
        const response = await fetch(`http://localhost:8000/api/tasks/${taskId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/merge-patch+json',
          },
          body: JSON.stringify(this.task),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData['hydra:description'] || 'Erreur lors de la mise à jour de la tâche.');
        }

        this.$router.push('/dashboard'); // Redirection vers le tableau de bord après mise à jour
      } catch (error) {
        this.errorMessage = error.message || 'Erreur inconnue.';
        console.error(error);
      }
    },
  },
  mounted() {
    this.fetchTask(); // Charger les données de la tâche au montage
  },
};

  </script>