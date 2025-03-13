<script setup lang="ts">
import { useFetch } from "@vueuse/core";
import { watch, computed } from "vue";

const { data: promotions, isFinished } = useFetch("/api/Promotions").json();

watch(isFinished, () => {
  if (isFinished.value) {
    console.log(promotions.value);
  }
});
</script>

<template>
  <NuxtLink to="admin/promotions" class="row-span-3 lg:row-start-4 lg:row-span-3 lg:col-start-3 lg:col-span-2 xl:col-start-1 flex flex-col gap-4 bg-transparent-10 duration-150 hover:bg-secondary-50 dark:hover:bg-secondary-200 px-6 py-3 lg:px-6 rounded-xl shadow-accent-300">
    <h2 class="font-semibold text-xl text-text-900">Produits en promotions</h2>
    
    <span class="text-5xl text-dominant-500 font-bold">{{ promotions ? promotions.length : 0 }}</span>
    <h3 class="text-sm text-text-800 font-medium">Dernières promotions</h3>
    <ul class="flex flex-col gap-3 " v-if="isFinished && promotions">
      <li v-for="promotion in promotions.slice(0, 3)" :key="promotion.id" class="text-sm text-text-800 flex gap-3 justify-between ">
        <span class="block text-sm text-text-800 truncate overflow-hidden">{{ promotion.product.name }}</span>
        <span class="text-accent-500 font-medium">{{promotion.percentage? promotion.percentage  : "10"}}%</span>
      </li>
    </ul>
  </NuxtLink>
</template>