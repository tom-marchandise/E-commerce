<script setup lang="ts">
import {computed} from "vue";

const props = defineProps<{user : number, userSince7days : number}>()

const userPercentageChange = computed(() => {
  const { user, userSince7days } = props;
  if (userSince7days === 0) return 0;
  const percentageChange = ((user - userSince7days) / userSince7days) * 100;
  return percentageChange.toFixed(0);
});

console.log(userPercentageChange);
</script>

<template>
  <NuxtLink to="admin/users" class="row-span-3 lg:col-span-2 lg:row-span-3 xl:col-span-1 space-y-4 bg-transparent-10 duration-150 hover:bg-secondary-50 dark:hover:bg-secondary-200 p-6 rounded-xl shadow-accent-300 relative">
    <div class="flex items-center justify-between">
      <h2 class="text-xl font-semibold text-text-900">Utilisateurs total</h2>
    </div>
    <div class=" flex items-center justify-between">
      <span class="text-5xl text-dominant-500 font-bold ">{{user}}</span>
    </div>

    <div class="flex items-center justify-between gap-5">
      <span class="text-sm text-text-800">Nouveaux inscrits</span>
      <div class="flex items-center">
        <span class="text-sm font-medium text-accent-500">{{userSince7days}}</span>
        <svg class="w-4 h-4 text-accent-500 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path>
        </svg>
      </div>
    </div>

    <div class="flex items-center justify-between gap-5">
      <div class="text-sm text-text-800">Comparé à la semaine passé</div>
      <div class="flex items-center">
        <span class="text-sm font-medium text-accent-600">{{userPercentageChange}}%</span>
        <svg class="w-4 h-4 text-accent-600 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </div>
    </div>
    <div class="absolute bottom-4 right-4 text-sm text-text-700">
      <span>3 administrateurs</span >
    </div>
  </NuxtLink>
</template>

<style scoped>

</style>