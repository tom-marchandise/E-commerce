<script setup lang="ts">
import SameModel from "~/components/Admin/components/Product/Variantes/sameModel.vue";
import { useRoute } from 'vue-router'
import {definePageMeta} from "~/.nuxt/imports";
definePageMeta({
  layout: 'admin'
});
const route = useRoute();
const id = route.params.id;
if (!id) {
  console.error("ID is null or undefined");
}

const links = [{
  label: 'Products',
  icon: 'i-heroicons-home',
  to: '/admin/products/'
},{
  label: 'Product ' + id,
  icon: 'i-heroicons-home',
  to: `/admin/products/${id}`,
}]

</script>

<template>
  <NuxtLayout>
    <div>
      <UBreadcrumb :links="links" />
      <SameModel :productId="id" />
    </div>

  </NuxtLayout>

</template>
