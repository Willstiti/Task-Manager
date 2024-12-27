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

    <div class="back-to-home">
      <router-link to="/">Retour à l'accueil</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '',
    };
  },
  methods: {
    async handleLogin() {
      try {
        if (!this.email || !this.password) {
          this.errorMessage = 'Veuillez remplir tous les champs.';
          return;
        }

        const response = await fetch('http://127.0.0.1:8000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data.message === 'Connexion réussie !') {
            this.errorMessage = '';
            this.$router.push('/dashboard');
          } else {
            this.errorMessage = 'Une erreur inattendue est survenue.';
          }
        } else {
          const errorData = await response.json();
          this.errorMessage = errorData.error || 'Adresse e-mail ou mot de passe incorrect.';
        }
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        this.errorMessage = 'Une erreur inattendue est survenue.';
      }
    },
  },
};
</script>
