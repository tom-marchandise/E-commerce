<script setup lang="ts">
import {definePageMeta} from "~/.nuxt/imports";
import StocksCard from "~/components/Admin/components/Cards/StocksCard.vue";

definePageMeta({
  layout: 'admin'
});
</script>

<template>
  <NuxtLayout>
    <StocksCard />
  </NuxtLayout>
</template>

<style scoped>

</style>