<script setup lang="ts">
import NavbarDesktop from "~/components/Admin/components/NavbarDesktop/NavbarDesktop.vue";
import Footer from "~/components/Footer.vue";
</script>

<template>
  <main class="grid grid-cols-[5rem,1fr] lg:grid-cols-[14rem,1fr] xl:grid-cols-[17rem,1fr] p-4 gap-3  h-[calc(100vh_-_5rem)]">
    <NavbarDesktop />
    <slot />
  </main>
</template>