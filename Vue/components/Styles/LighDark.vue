<template>
  <div class="flex items-center cursor-pointer ml-4" @click="toggleMode">
    <span v-if="isDarkMode" class="text-yellow-500">
      <SunIcon class="h-6 w-6" />
    </span>
    <span v-else>
      <MoonIcon class="h-6 w-6 text-text-900" />
    </span>
  </div>
</template>

<script setup>
import { ref, onMounted, provide, watch } from 'vue';
import { MoonIcon, SunIcon } from '@heroicons/vue/24/solid';

const isDarkMode = ref(false);

const applyMode = () => {
  if (typeof window !== 'undefined' && localStorage.getItem('darkMode') === 'true') {
    isDarkMode.value = true;
    document.body.classList.add('dark');
  } else {
    isDarkMode.value = false;
    document.body.classList.remove('dark');
  }
  console.log('Mode sombre appliqué:', isDarkMode.value); // Débogage
};

const toggleMode = () => {
  isDarkMode.value = !isDarkMode.value;
  if (typeof window !== 'undefined') {
    localStorage.setItem('darkMode', isDarkMode.value.toString());
  }
  document.body.classList.toggle('dark', isDarkMode.value);
  console.log('Mode sombre basculé:', isDarkMode.value); // Débogage
};

onMounted(() => {
  applyMode();
});

// Fournir `isDarkMode` aux composants enfants
provide('isDarkMode', isDarkMode);


</script>