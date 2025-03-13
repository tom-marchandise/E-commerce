<script setup lang="ts">

</script>

<template>
  <div class="fixed bottom-4 left-[50%] translate-x-[-50%] border shadow-xl bg-white flex rounded-full p-2 lg:hidden gap-2">
    <NuxtLink to="/admin/users" class="py-2.5 rounded-full min-w-20  text-center text-sm" active-class="bg-black text-white">Utilisateur</NuxtLink>
    <NuxtLink to="/admin/products" class="py-2.5 rounded-full min-w-20  text-center text-sm" active-class="bg-black text-white">Produits</NuxtLink>
    <NuxtLink to="/admin/orders" class=" py-2.5 rounded-full min-w-20 text-center text-sm" active-class="bg-black text-white">Commandes</NuxtLink>
    <NuxtLink to="/admin/categories" class="px-3 py-2.5 rounded-full min-w-20  text-center text-sm" active-class="bg-black text-white">Categories</NuxtLink>
  </div>
</template>

<style scoped>

</style>