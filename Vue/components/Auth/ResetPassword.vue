<template>
  <div class="flex flex-col justify-center items-center h-screen space-y-4 bg-[#F3F2F2] dark:bg-black text-text-900">
    <div class="flex items-center space-x-2">
      <h1 class="text-2xl font-bold">Réinitialiser votre mot de passe</h1>
    </div>
    <p>Veuillez entrer un nouveau mot de passe</p>
    <div class="w-80">
      <input
          type="password"
          v-model="newPassword"
          placeholder="Nouveau mot de passe"
          class="w-full px-4 py-2 mt-2 border border-[#D2D2D2] rounded-lg bg-transparent text-black focus:outline-none focus:ring-2"
          required
      />
    </div>
    <p class="text-accent-400 text-xs mt-2 opacity-70">
      Le mot de passe doit contenir au moins 6 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.
    </p>
    <button @click="resetPassword" 
            type="button" 
            class="bg-dominant-500 text-white py-2 px-10 rounded-lg mt-4 hover:bg-black transition duration-300">
      Valider
    </button>
    <p v-if="errorMessage" class="text-red-500 mt-2">{{ errorMessage }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

// Références
const newPassword = ref('');
const errorMessage = ref<string | null>(null);
const route = useRoute();
const router = useRouter();

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;

const resetPassword = async () => {
  const token = route.query.token as string;
  const email = route.query.email as string;

  if (!passwordRegex.test(newPassword.value)) {
    errorMessage.value = 'Le mot de passe ne satisfait pas les critères de sécurité.';
    return;
  }

  try {
    const response = await axios.post('/api/auth/reset-password', {
      Token: token,
      Email: email,
      NewPassword: newPassword.value
    });

    if (response.status === 200) {
      router.push('/resetpasswordsuccess');
    } else {
      errorMessage.value = 'Erreur lors de la réinitialisation du mot de passe.';
    }
  } catch (error) {
    errorMessage.value = 'Erreur lors de la réinitialisation du mot de passe.';
  }
};
</script>

<style scoped>
</style>
