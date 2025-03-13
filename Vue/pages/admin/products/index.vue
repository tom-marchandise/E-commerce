<script setup lang="ts">
import {ProductCard} from "~/components/Admin";
import NavbarMobile from "~/components/Admin/components/NavbarMobile/NavbarMobile.vue";
import NavbarDesktop from "~/components/Admin/components/NavbarDesktop/NavbarDesktop.vue";
import { useFetch } from "@vueuse/core";
import {definePageMeta} from "~/.nuxt/imports";
import StockCard from "~/components/Admin/components/Cards/StockCard/StockCard.vue";
import ky from "ky";
import Search from "~/components/Admin/components/Search/Search.vue";

definePageMeta({
  layout: 'admin'
});
const router = useRouter();

const userRole = ref<string>('');

onMounted(() => {
  const token = localStorage.getItem('jwt');
  if (token) {
    try {
      const decodedToken: any = jwtDecode(token);
      const role = decodedToken.role;

      if (role === 'customers') {
        router.push('/');
      }
    } catch (error) {
      console.error('Erreur lors du décodage du token:', error);
    }
  } else {
  }
});

const { data: products, isFinished, isFetching } = await useFetch("/api/AdminProduit/").json();
console.log(products);
const handleDeleteProduct = (id: number) => {
  products.value = products.value.filter(e => e.id !== id);
};


async function downloadCsv() {
  try {
    const response = await ky.post('/api/DownloadCsv/GetStats');
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'produit.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('erreur dans le telechargement du csv :', error);
  }
}

</script>

<template>
  <NuxtLayout>
    <ProductCard :count="count" :products="products"/>
  </NuxtLayout>
</template>
