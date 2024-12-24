<template>
    <div class="container">
      <h1>Ajout des Tâches</h1>
        
      <form @submit.prevent="handleTaskRegister">

        <div class="form-group">
          <label for="title">Titre</label>
          <input
            type="title"
            id="title"
            v-model="title"
            placeholder="Entrez le titre de la tâche"
            required
          />
        </div>

        <div class="form-group">
          <label for="description">Description</label>
          <textarea
            type="Description"
            id="description"
            v-model="description"
            placeholder="Description de la tâche"
            rows = "10"
            style="width:100%"
          ></textarea>
        </div>

        <div class="form-group">
            <label for="status">Statut</label>
            <select id="status" v-model="status" required>
                <optgroup label="Statut de la tâche">
                <option value="todo">A faire</option>
                <option value="in_progress">En cours</option>
                <option value="done">Terminée</option>
                </optgroup>
            </select>
        </div>

  
        <div class="form-group">
            <label for="priority">Priorité</label>
            <select id="priority" v-model="priority" required>
                <optgroup label="Statut de la tâche">
                <option value="hight">Haute</option>
                <option value="middle">Moyenne</option>
                <option value="low">Basse</option>
                <option value="osef">Osef</option>
                </optgroup>
            </select>
        </div>
        
        <button type="submit">Ajouter</button>
  
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
      title: '',
      description: '',
      status: 'todo',
      priority: 'osef',
      selectedDate: this.currentDate(),                  
      errorMessage: ''
    };
  },
  methods: {
    currentDate() {
      const current = new Date();
      const date = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;      
      return date;
    },
    async handleTaskRegister() {
      try {
        // Appel à l'API avec `fetch`
        const response = await fetch('http://localhost:8000/api/tasks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/ld+json',
          },
          body: JSON.stringify({
            title: this.title,
            description: this.description,
            status: this.status,
            priority: this.priority,
            createdAt: this.selectedDate,
            user: "http://localhost:8000/api/users/9",
          }),
        });

        if (!response.ok) {
          // Gestion des erreurs HTTP
          const errorData = await response.json();
          throw new Error(errorData['hydra:description'] || 'Une erreur est survenue.');
        }

        const data = await response.json();
        console.log('Utilisateur enregistré :', data);

        // Redirige vers la page de login après l'inscription
        this.$router.push('/dashboard');
      } catch (error) {
        // Gestion des erreurs liés à l'API
        this.errorMessage = error.message || 'Erreur lors de l’envoi des données.';
        console.error(error);
      }
    },
  },
};

  </script>