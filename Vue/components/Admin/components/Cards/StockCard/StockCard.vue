<script setup lang="ts">
defineProps<{title : string, number : string}>();
</script>

<template>
  <NuxtLink to="/admin/users" class=" flex items-center justify-between xl:flex-col xl:items-start lg:col-start-3 lg:col-span-2 xl:row-span-2 gap-4 bg-transparent-10 duration-150 hover:bg-secondary-50 dark:hover:bg-secondary-200 p-6 rounded-xl shadow-accent-300">
    <h2 class="font-semibold text-xl text-text-900">{{ title }} </h2>
    <span class="text-5xl text-dominant-500 font-bold ">{{number}}</span>
  </NuxtLink>
</template>

<style scoped>

</style>