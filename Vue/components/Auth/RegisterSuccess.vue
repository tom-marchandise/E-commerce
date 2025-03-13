<script setup lang="ts">
import { CheckBadgeIcon } from '@heroicons/vue/24/outline';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';


const router = useRouter();


onMounted(() => {
  const jwtToken = localStorage.getItem('jwt');
  if (jwtToken) {
    console.log('Token JWT récupéré:', jwtToken);
  } else {
    console.log('Aucun token JWT trouvé dans le localStorage.');
  }

  setTimeout(() => {
    router.push('/');
  }, 2000);
});
</script>

<template>
  <div class="flex flex-col justify-center items-center h-screen space-y-4 bg-[#F3F2F2] dark:bg-black text-text-900">
    <div class="flex items-center space-x-2">
      <CheckBadgeIcon class="w-10 h-10 text-dominant-400" />
      <h1 class="text-2xl font-bold">Bienvenue !</h1>
    </div>
    <p class="text-2xl font-bold text-center">
      Vous pouvez désormais accéder à vos commandes, à votre suivi,
      à vos remises et bien plus encore...
    </p>
  </div>
</template>

<style scoped>
</style>
