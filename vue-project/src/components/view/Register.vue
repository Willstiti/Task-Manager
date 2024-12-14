<template>
    <div class="login-container">
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
        const response = await fetch('http://localhost:8000/api/users', {
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

        // Redirige vers la page de login après l'inscription
        this.$router.push('/Login');
      } catch (error) {
        // Gestion des erreurs liés à l'API
        this.errorMessage = error.message || 'Erreur lors de l’envoi des données.';
        console.error(error);
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
  