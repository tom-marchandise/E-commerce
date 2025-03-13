<template>
  <div class="flex flex-col justify-center items-center h-screen space-y-4 bg-[#F3F2F2] dark:bg-black text-text-900">
    <div class="flex items-center space-x-2">
      <h1 class="text-2xl font-bold text-accent-400">Mot de passe oublié</h1>
    </div>
    <p>Veuillez entrer votre adresse e-mail, un lien vous sera envoyé afin de réinitialiser votre mot de passe</p>
    <div class="w-80">
      <input
          type="email"
          v-model="email"
          placeholder="Entrez votre adresse e-mail"
          class="w-full px-4 py-2 mt-2 border border-[#D2D2D2] rounded-lg bg-transparent text-black focus:outline-none focus:ring-2"
          required
      />
    </div>
    <button @click="sendResetLink" 
            type="button" 
            class="bg-dominant-500 text-white py-2 px-10 rounded-lg hover:bg-black transition duration-300">
      Envoyer le lien
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const email = ref('');
const router = useRouter();

const sendResetLink = async () => {
  try {
    const response = await axios.post('/api/auth/forget-password', { Email: email.value });
    if (response.status === 200) {
      alert('Un email contenant le lien de réinitialisation a été envoyé.');
      window.location.href = '/auth/validatepassword';
    } else {
      alert('Erreur lors de l\'envoi de l\'email.');
    }
  } catch {
    console.log("Erreur avec le mailer");
  }
};

</script>

<style scoped>
</style>
