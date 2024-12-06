<template>
  <div class="login-container">
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
  name: 'LoginVue',
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

<style scoped>
.login-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  background-color: #f7f7f7;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  font-size: 18px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.error-message {
  margin-top: 15px;
  color: red;
  text-align: center;
}

/* Style pour le lien de retour à l'accueil */
.back-to-home {
  text-align: center;
  margin-top: 20px;
}

.back-to-home a {
  color: #007bff;
  text-decoration: none;
  font-size: 1rem;
}

.back-to-home a:hover {
  text-decoration: underline;
}
</style>
