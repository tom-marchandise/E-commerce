<script setup>
import DepressionSVG from "~/assets/404/DepressionSVG.vue";

</script>

<template>
  <div class="bg-gray-900 min-h-screen text-white relative overflow-hidden flex items-center justify-center bg-gradient-to-r from-[#ffad66] to-[#f5a3e7] select-none">
      <span class="text-[48vw] font-bold leading-none">4</span>
      <div class="w-[28vw] h-[35.63vw] bg-white rounded-md p-5 text-black flex flex-col justify-center items-center gap-3">
        <span class="font-semibold text-[1.5vw] text-center">Ho non tu t'es perdu ? Ne déprime pas, tu peux revenir sur l'Accueil en cliquant <NuxtLink to="/" class="text-dominant-500">ici</NuxtLink></span>
        <div class="w-[26vw]">
          <DepressionSVG/>
        </div>
      </div>
      <span class="text-[48vw] font-bold leading-none">4</span>
  </div>
</template>