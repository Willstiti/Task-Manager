<template>
  <div class="container">
    <h1>Connexion</h1>

    <form @submit.prevent="handleLogin">
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

      <button type="submit">Se connecter</button>

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
      email: '',        // Email saisi par l'utilisateur
      password: '',     // Mot de passe saisi par l'utilisateur
      errorMessage: '', // Message d'erreur affiché en cas de problème
    };
  },
  methods: {
    handleLogin() {
      if (!this.email || !this.password) {
        this.errorMessage = 'Veuillez remplir tous les champs.';
        return;
      }

      if (this.email === 'admin@example.com' && this.password === 'password123') {
        this.errorMessage = '';
        this.$router.push('/dashboard'); // Redirection vers la page "dashboard"
      } else {
        this.errorMessage = 'Adresse e-mail ou mot de passe incorrect.';
      }
    },
  },
};
</script>