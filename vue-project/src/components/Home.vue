<template>
  <main class="home-container">
    <section class="hero">
      <h1>Bienvenue sur <span class="app-name">Mon Application Vue.js</span></h1>
      <p>
        Une application moderne et intuitive pour simplifier votre gestion quotidienne.
        Connectez-vous pour découvrir toutes ses fonctionnalités !
      </p>
      <router-link to="/login" class="cta-button">Connecte-toi</router-link>
    </section>

    <section class="features">
      <h2>Fonctionnalités principales</h2>
      <div class="feature-list">
        <div class="feature-item">
          <h3>Gestion des tâches</h3>
          <p>Organisez et suivez vos tâches en temps réel avec une interface simple et efficace.</p>
        </div>
        <div class="feature-item">
          <h3>Suivi des projets</h3>
          <p>Gérez vos projets de A à Z avec une vue d'ensemble complète.</p>
        </div>
        <div class="feature-item">
          <h3>Notifications en direct</h3>
          <p>Recevez des mises à jour instantanées pour rester informé à tout moment.</p>
        </div>
      </div>
    </section>

    <section class="about">
      <h2>À propos de l'application</h2>
      <p>
        Cette application a été conçue pour vous offrir une expérience utilisateur fluide et agréable,
        tout en répondant à vos besoins de gestion personnelle ou professionnelle.
      </p>
    </section>
  </main>
</template>

<script>
export default {
  name: 'HomeVue',
};
</script>

<style scoped>
/* Conteneur principal */
.home-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

/* Section principale avec le titre */
.hero {
  text-align: center;
  margin-bottom: 40px;
}

.hero h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

.app-name {
  color: #007bff;
  font-weight: bold;
}

.hero p {
  font-size: 1.2rem;
  margin-bottom: 20px;
}

.cta-button {
  display: inline-block;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  font-size: 1.1rem;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.cta-button:hover {
  background-color: #0056b3;
}

/* Section des fonctionnalités */
.features {
  margin-bottom: 40px;
}

.features h2 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 20px;
}

.feature-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.feature-item {
  width: 30%;
  background-color: #f7f7f7;
  padding: 15px;
  margin: 10px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.feature-item h3 {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.feature-item p {
  font-size: 1rem;
  line-height: 1.5;
}

/* Section À propos */
.about h2 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 10px;
}

.about p {
  font-size: 1.2rem;
  text-align: center;
  line-height: 1.6;
}
</style>
