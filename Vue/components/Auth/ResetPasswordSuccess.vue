<template>
  <div class="flex flex-col justify-center items-center h-screen space-y-4 bg-[#F3F2F2] dark:bg-black text-text-900">
    <div class="flex items-center space-x-2">
      <CheckBadgeIcon class="w-10 h-10 text-dominant-500" />
      <h1 class="text-2xl font-bold">
        Rebienvenue, {{ firstName ? `${firstName}` : '' }} !
      </h1>
    </div>
    <p class="text-center">
      Votre mot de passe a été mis à jour, vous pouvez maintenant vous reconnecter !
    </p>
    <div class="mt-6 flex justify-center text-center text-sm text-gray-500">
      <p>
        <router-link to="/auth/login">
          <button type="button" class="font-bold text-accent-400">
            Se connecter
            <span aria-hidden="true"> &rarr;</span>
          </button>
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import jwtDecode from 'jwt-decode';
import { CheckBadgeIcon } from '@heroicons/vue/24/outline';

const firstName = ref<string | null>(null);

onMounted(() => {
  const token = localStorage.getItem('jwt');
  if (token) {
    try {
      const decodedToken: any = jwtDecode(token);
      firstName.value = decodedToken.given_name;
    } catch (error) {
      console.error('Erreur lors du décodage du token:', error);
    }
  }
});
</script>

<style scoped>
</style>
