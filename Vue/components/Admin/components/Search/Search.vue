<script setup lang="ts">
defineProps<{placeholder : string, urlApi : string}>()
</script>

<template>
  <div class="rounded-xl text-text-900 w-full h-fit p-0">
    <input type="text" :placeholder="placeholder" class="bg-transparent-10 px-5 p-3 outline-0 rounded-full text-text-900 placeholder-text-900 w-full">
  </div>
</template>
