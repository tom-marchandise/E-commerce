<script setup lang="ts">
defineProps<{
  colorClass: string,
  size: string,
}>()
</script>

<template>
  <svg :class="colorClass" :width="size" :height="size" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path clip-rule="evenodd" d="m11 3h2c4.9706 0 9 4.02944 9 9 0 4.9706-4.0294 9-9 9h-10c-.55228 0-1-.4477-1-1v-8c0-4.97056 4.02944-9 9-9zm-3 10c.55228 0 1-.4477 1-1s-.44772-1-1-1-1 .4477-1 1 .44772 1 1 1zm5-1c0 .5523-.4477 1-1 1s-1-.4477-1-1 .4477-1 1-1 1 .4477 1 1zm3 1c.5523 0 1-.4477 1-1s-.4477-1-1-1-1 .4477-1 1 .4477 1 1 1z" fill="currentColor" fill-rule="evenodd"/>
  </svg>
</template>
