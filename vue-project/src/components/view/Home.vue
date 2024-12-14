<template>
  <main class="home-container">
    <section class="hero">
      <h1>Bienvenue sur <span class="app-name">Mon Application Vue.js</span></h1>
      <p>
        Une application moderne et intuitive pour simplifier votre gestion quotidienne.
        Connectez-vous pour découvrir toutes ses fonctionnalités !
      </p>
      <router-link to="/login" class="cta-button">Connecte-toi</router-link>
      <router-link to="/register" class="cta-button">Inscris toi</router-link>
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
