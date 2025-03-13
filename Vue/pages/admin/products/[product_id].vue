<script setup lang="ts">
import Tabs from "~/components/Admin/components/Product/tabs.vue";
import axios from "axios";
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute()
const productId = route.params.product_id;

const links = [{
  label: 'Products',
  icon: 'i-heroicons-home',
  to: '/admin/products',
}]

console.log(productId)
const product = ref<string>('');

const fetchProduct = async () => {

  try {
    const response = await axios.get(`/api/AdminProduit/${productId}`);
    product.value = response.data[0]
   
  } catch (error) {
    console.error('Erreur lors de la récupération du produit:', error);
  }
};

onMounted(() => {
  fetchProduct();
  console.log(product)
});
</script>

<template>
  <UBreadcrumb :links="links" />
  <div v-if="product" class="h-screen"> 
    <Tabs :product="product" />
  </div>
</template>