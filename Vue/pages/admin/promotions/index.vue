<script setup lang="ts">
import NavbarDesktop from "~/components/Admin/components/NavbarDesktop/NavbarDesktop.vue";
import NavbarMobile from "~/components/Admin/components/NavbarMobile/NavbarMobile.vue";
import PromotionsCard from "~/components/Admin/components/Cards/PromotionsCard.vue";

import {definePageMeta} from "~/.nuxt/imports";

definePageMeta({
  layout: 'admin'
});
</script>

<template>
  <NuxtLayout>
      <PromotionsCard class="flex flex-col overflow-hidden"/>
  </NuxtLayout>

</template>
