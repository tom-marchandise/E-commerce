<script setup lang="ts">
import {useFetch} from "@vueuse/core";
import CategoryCard from "~/components/Admin/components/Cards/CategoryCard.vue";
import NavbarDesktop from "~/components/Admin/components/NavbarDesktop/NavbarDesktop.vue";
import NavbarMobile from "~/components/Admin/components/NavbarMobile/NavbarMobile.vue";
import {definePageMeta} from "~/.nuxt/imports";

definePageMeta({
  layout: 'admin'
});

const {data : categories, isFinished} = useFetch("/api/AdminCategory").json();
const handleDeleteProduct = (id) => {
  categories.value = categories.value.filter(e => e.id !== id);
  console.log(categories.value)
}
</script>

<template>
  <NuxtLayout>
      <CategoryCard @deleteCategory="handleDeleteProduct" :categories="categories" :isFinished="isFinished" class="flex flex-col overflow-hidden"/>
  </NuxtLayout>
</template>
