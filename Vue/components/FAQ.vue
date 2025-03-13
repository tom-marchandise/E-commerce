<script setup lang="ts">
import { ref } from 'vue';

const faqs = ref([
  {
    question: 'Commande',
    answer: `
      <h2 class="text-lg font-semibold">Détails de la commande</h2>
      <p>Pour voir le détail de votre commande, veuillez suivre ces étapes :</p>
      <ol class="list-decimal pl-5">
        <li><strong>Connectez-vous</strong> à votre compte sur notre site.</li>
        <li><strong>Accédez à la section</strong> "Mes commandes" depuis votre tableau de bord.</li>
        <li><strong>Cliquez</strong> sur le numéro de commande pour afficher les détails.</li>
      </ol>
      <p>Vous pourrez consulter les informations suivantes :</p>
      <ul class="list-disc pl-5">
        <li>Les articles achetés</li>
        <li>Les quantités</li>
        <li>Les prix</li>
        <li>L'état de la commande</li>
      </ul>
    `,
    isOpen: false,
  },
  {
    question: 'Retour',
    answer: `
      <h2 class="text-lg font-semibold">Informations sur les retours</h2>
      <p>Pour retourner un article, veuillez suivre ces étapes :</p>
      <ol class="list-decimal pl-5">
        <li><strong>Connectez-vous</strong> à votre compte sur notre site.</li>
        <li><strong>Accédez à la section</strong> "Mes retours" depuis votre tableau de bord.</li>
        <li><strong>Sélectionnez</strong> l'article que vous souhaitez retourner.</li>
        <li><strong>Remplissez</strong> le formulaire de demande de retour.</li>
        <li><strong>Expédiez</strong> l'article à l'adresse fournie.</li>
      </ol>
      <p>Assurez-vous de conserver le reçu d'expédition pour toute réclamation.</p>
    `,
    isOpen: false,
  },
  {
    question: 'Livraison',
    answer: `
      <h2 class="text-lg font-semibold">Informations sur la livraison</h2>
      <p>Pour suivre la livraison de votre commande, suivez ces étapes :</p>
      <ol class="list-decimal pl-5">
        <li><strong>Connectez-vous</strong> à votre compte sur notre site.</li>
        <li><strong>Accédez à la section</strong> "Mes commandes" depuis votre tableau de bord.</li>
        <li><strong>Cliquez</strong> sur la commande pour afficher les détails de livraison.</li>
        <li><strong>Utilisez</strong> le numéro de suivi pour suivre l'état de la livraison.</li>
      </ol>
      <p>Vous recevrez également des mises à jour par email concernant l'état de votre livraison.</p>
    `,
    isOpen: false,
  },
]);

const toggleFAQ = (index: number) => {
  faqs.value[index].isOpen = !faqs.value[index].isOpen;
};
</script>

<template>
  <div class="page-container bg-[#F3F2F2]">
    <Navbar />
    <main class="content">
      <h1 class="text-black text-2xl font-bold mt-6 text-center">En quoi pouvons-nous vous aider ?</h1>
      <div v-for="(faq, index) in faqs" :key="index" class="faq-container">
        <div class="faq-question" @click="toggleFAQ(index)">
          <span>{{ faq.question }}</span>
          <span class="arrow" :class="{ 'arrow-up': faq.isOpen }">▶</span>
        </div>
        <div v-if="faq.isOpen" class="faq-answer" v-html="faq.answer">
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>

<style scoped>
html, body {
  height: 100%;
  margin: 0;
}

.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  flex: 1;
  padding: 20px;
}

.typewriter {
  overflow: hidden;
  border-right: .15em solid orange;
  white-space: nowrap;
  margin: 0 auto 20px;
  letter-spacing: .15em;
  animation: typing 3.5s steps(40, end), blink .75s step-end infinite;
}

@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}

@keyframes blink {
  from, to { border-color: transparent }
  50% { border-color: orange }
}

.faq-container {
  margin: 20px 0;
}

.faq-question {
  cursor: pointer;
  background: #ffffff;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.faq-answer {
  padding: 15px;
  border: 1px solid #ddd;
  border-top: none;
  background: #ffffff;
  border-radius: 0 0 4px 4px;
}

.arrow {
  font-size: 20px;
  transition: transform 0.3s ease;
}

.arrow-up {
  transform: rotate(90deg);
}

.list-decimal {
  margin-left: 20px;
}

.list-disc {
  margin-left: 20px;
  list-style-type: none;
}

.faq-answer h2 {
  margin-left: 20px;
}
</style>
