<template>
  <div class="fixed bottom-4 right-4">
    <button @click="toggleChat" class="bg-blue-600 rounded-full p-3 shadow-lg">
      <img src="../assets/pictures/chatbot.png" alt="Chatbot" class="h-12 w-12" />
    </button>
    <div v-if="isOpen" class="bg-white shadow-lg rounded-lg p-4 mt-2 w-96 max-w-xs">
      <h3 class="text-lg font-semibold text-center">Chatbot</h3>
      <div class="chat-content max-h-80 overflow-y-auto mt-2">
        <div v-for="(msg, index) in messages" :key="index" class="chat-message mb-2 flex" :class="{'self-end justify-end': msg.isUser, 'self-start justify-start': !msg.isUser}">
          <p class="p-2 rounded-lg max-w-xs" :class="msg.isUser ? 'bg-blue-500 text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'">{{ msg.text }}</p>
        </div>
        <div v-if="showOptions" class="options mt-2 flex flex-col">
          <button @click="selectOption('commande')" class="option-button bg-blue-100 hover:bg-blue-200 text-blue-800 font-semibold py-2 px-4 rounded-lg mb-1">Mes commandes</button>
          <button @click="selectOption('retours')" class="option-button bg-blue-100 hover:bg-blue-200 text-blue-800 font-semibold py-2 px-4 rounded-lg mb-1">Mes retours</button>
          <button @click="selectOption('suivi')" class="option-button bg-blue-100 hover:bg-blue-200 text-blue-800 font-semibold py-2 px-4 rounded-lg">Mes suivis de commande</button>
        </div>
      </div>
      <div class="mt-2 flex">
        <input v-model="userInput" @keyup.enter="sendMessage" type="text" placeholder="Écrivez un message..." class="flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <button @click="sendMessage" class="ml-2 bg-blue-600 text-white rounded-lg px-4 py-2">Envoyer</button>
      </div>
      <button @click="toggleChat" class="mt-2 bg-red-500 text-white py-1 px-2 rounded">
        Fermer
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isOpen = ref(false);
const messages = ref([
  { text: 'Bonjour ! Comment puis-je vous aider aujourd\'hui ?', isUser: false },
]);
const userInput = ref('');

const toggleChat = () => {
  isOpen.value = !isOpen.value;
};

const showOptions = ref(true);

const selectOption = (option: string) => {
  let response = '';

  switch (option) {
    case 'commande':
      response = 'Je vous écoute à propos de vos commandes.';
      break;
    case 'retours':
      response = 'Je vous écoute à propos de vos retours.';
      break;
    case 'suivi':
      response = 'Je vous écoute à propos de votre suivi de commande.';
      break;
  }

  messages.value.push({ text: response, isUser: false });
  showOptions.value = false;
};

const sendMessage = () => {
  if (userInput.value.trim() === '') return;
  messages.value.push({ text: userInput.value, isUser: true });

  setTimeout(() => {
    const response = aStarSearch(userInput.value, keywordsResponses);
    messages.value.push({ text: response, isUser: false });
  }, 2000);

  userInput.value = '';
};

// algo heuristique
const calculateRelevance = (input: string, response: string): number => {
  const inputWords = input.toLowerCase().split(' ');
  const responseWords = response.toLowerCase().split(' ');

  const commonWords = inputWords.filter(word => responseWords.includes(word));
  return commonWords.length;
};

const aStarSearch = (input: string, candidates: Array<{ response: string }>) => {
  const openSet = candidates.map(candidate => ({
    node: candidate,
    g: 0,
    h: calculateRelevance(input, candidate.response),
  }));

  openSet.sort((a, b) => (a.g + a.h) - (b.g + b.h)); 
  return openSet[0].node.response;
};

// dico de mots clé (à mettre en fichier json pour refractor le code et le clean)
const keywordsResponses = [
  { keywords: ['commande', 'acheter', 'numéro de commande'], response: 'Pour toute question sur votre commande, veuillez consulter votre espace client.' },
  { keywords: ['retour', 'retours', 'rendre'], response: 'Les retours peuvent être effectués dans un délai de 30 jours après réception.' },
  { keywords: ['suivi', 'numéro de suivi', 'suivre'], response: 'Pour le suivi de votre commande, veuillez entrer votre numéro de suivi.' },
  { keywords: ['aide', 'assistance'], response: 'Comment puis-je vous aider davantage ?' },
  { keywords: ['prix', 'coût'], response: 'Les prix de nos produits sont indiqués sur notre site.' },
  { keywords: ['pas trouvé', 'trouver', 'problème'], response: 'Je suis désolé d\'apprendre que vous ne trouvez pas votre numéro de commande.' },
];

</script>

<style scoped>
.chat-content {
  max-height: 300px;
  overflow-y: auto;
}
</style>
