<script setup lang="ts">
import { onMounted } from 'vue';
import { ref } from 'vue';

import Specifications from "~/components/Admin/components/Product/NewProduct/Specifications.vue";

const catId = ref<string | null>(null);
onMounted(() => {
  catId.value = localStorage.getItem('cat_id')
  console.log(catId.value)
})
</script>

<template>
  <Specifications :catId="catId" />
</template>
<style scoped>

</style>