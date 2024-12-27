<template>
    <div class="container">
      <h1>Inscription</h1>

      <form @submit.prevent="handleRegister">

        <div class="form-group">
          <label for="prenom">Prénom</label>
          <input
            type="prenom"
            id="prenom"
            v-model="prenom"
            placeholder="Entrez votre prénom"
            required
          />
        </div>

        <div class="form-group">
          <label for="nom">Nom</label>
          <input
            type="nom"
            id="nom"
            v-model="nom"
            placeholder="Entrez votre nom"
            required
          />
        </div>

        <div class="form-group">
          <label for="email">Adresse e-mail</label>
          <input
            type="email"
            id="email"
            v-model="email"
            placeholder="Entrez votre e-mail"
            required
          />
        </div>

        <div class="form-group">
          <label for="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="Entrez votre mot de passe"
            required
          />
        </div>

        <button type="submit">Soumettre</button>

        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      </form>

      <div class="back-to-home">
        <router-link to="/">Retour à l'accueil</router-link>
      </div>
    </div>
  </template>

  <script>
  export default {
    name: 'RegisterVue',
  data() {
    return {
      prenom: '',
      nom: '',
      email: '',
      password: '',
      errorMessage: '',
    };
  },
  methods: {
    async handleRegister() {
      try {
        // Appel à l'API avec `fetch`
        const response = await fetch('http://127.0.0.1:8000/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/ld+json',
          },
          body: JSON.stringify({
            firstName: this.prenom,
            lastName: this.nom,
            email: this.email,
            password: this.password,
          }),
        });

        if (!response.ok) {
          // Gestion des erreurs HTTP
          const errorData = await response.json();
          throw new Error(errorData['hydra:description'] || 'Une erreur est survenue.');
        }

        const data = await response.json();
        console.log('Utilisateur enregistré :', data);

        // Redirige vers la page du dashboard après l'inscription
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
