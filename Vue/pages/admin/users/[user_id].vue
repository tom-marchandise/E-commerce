<script setup lang="ts">
  const route = useRoute()
  const userId = route.params.user_id;
</script>

<template>
  mon user {{ userId }}
</template>

<style scoped>

</style>