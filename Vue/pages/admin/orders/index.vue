<script setup lang="ts">
import {useFetch} from "@vueuse/core";
import CategoryCard from "~/components/Admin/components/Cards/CategoryCard.vue";
import NavbarDesktop from "~/components/Admin/components/NavbarDesktop/NavbarDesktop.vue";
import NavbarMobile from "~/components/Admin/components/NavbarMobile/NavbarMobile.vue";
import {definePageMeta} from "~/.nuxt/imports";

definePageMeta({
  layout: 'admin'
});
</script>

<template>
  <NuxtLayout>
    LES COMMANDES
  </NuxtLayout>
</template>

<style scoped>

</style>