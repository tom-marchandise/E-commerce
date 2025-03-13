<script setup lang="ts">
import { CheckBadgeIcon } from '@heroicons/vue/24/outline'
</script>

<template>
  <div class="flex flex-col justify-center items-center h-screen space-y-4 bg-[#F3F2F2] dark:bg-black text-text-900">
    <div class="flex items-center space-x-2">
      <CheckBadgeIcon class="w-10 h-10 text-dominant-500" />
      <h1 class="text-2xl font-bold">Merci !</h1>
    </div>
    <p class="text-2xl font-bold text-center">
      Veuillez vérifier vos mails afin de réinitialiser votre mot de passe
    </p>
    <p>Un lien s'y trouve, il vous suffira de cliquer dessus pour le modifier</p>
    <p class="font-bold text-accent-400">Renvoyez un lien</p>
  </div>
</template>

<style scoped>
</style>

