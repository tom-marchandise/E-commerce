<script setup lang="ts">
import DonutsCategory from "~/components/Admin/components/Charts/DonutsCategory/DonutsCategory.vue";

defineProps<{category : number}>()
</script>

<template>
  <NuxtLink to="admin/categories" class="row-span-3 lg:col-start-1 lg:col-span-2 xl:row-start-1 xl:row-end-4 xl:col-start-2 xl:col-end-3 bg-transparent-10 flex flex-col gap-5 rounded-xl p-5 hover:bg-secondary-50 dark:hover:bg-secondary-200 relative">
    <h2 class="font-semibold text-xl text-text-900 text-center">Catégorie total</h2>
    <div class="flex justify-center items-center gap-5">
      <DonutsCategory :category="category"/>
    </div>
  </NuxtLink>
</template>

<style scoped>

</style>