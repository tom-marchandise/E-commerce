<script setup lang="ts">
import { onMounted, ref } from 'vue';
import jwtDecode from 'jwt-decode';
import { useRouter } from 'vue-router';
import { CheckBadgeIcon } from '@heroicons/vue/24/outline';

const firstName = ref<string | null>(null);
const router = useRouter();

onMounted(() => {
  const token = localStorage.getItem('jwt');
  console.log('jwt:', token);
  if (token) {
    try {

      const decodedToken: any = jwtDecode(token);
      firstName.value = decodedToken.given_name;
    } catch (error) {
      console.error('Erreur lors du décodage du token:', error);
    }
  } else {
    console.warn('Aucun token trouvé dans le localStorage');
  }

  setTimeout(() => {
    router.push('/');
  }, 2000);
});
</script>

<template>
  <div class="flex flex-col justify-center items-center h-screen space-y-4 bg-[#F3F2F2] dark:bg-black text-text-900">
    <div class="flex items-center space-x-2">
      <CheckBadgeIcon class="w-10 h-10 text-dominant-500" />
      <h1 class="text-2xl font-bold">
        Rebienvenue,
      </h1>
      <h2 class="text-2xl font-bold text-accent-400">{{ firstName ? `${firstName}` : '' }} !</h2>
    </div>
    <p class="text-2xl font-bold text-center">
      Vous pouvez désormais accéder à vos commandes, à votre suivi,
      à vos remises et bien plus encore...
    </p>
  </div>
</template>