<script setup lang="ts">
import Card from "~/components/Admin/components/Cards/Card.vue";
import ky from "ky";
import ModalStock from "~/components/Admin/components/ModalStock/ModalStock.vue";
const isRecentProduct = (createdAt) =>  {
  let date: Date = new Date(createdAt);
  let today: Date = new Date();
  let fifteenDaysAgo: Date = new Date(new Date(today).setDate(new Date(today).getDate() - 15));
  console.log(date < fifteenDaysAgo);
  return date > fifteenDaysAgo;
}

const props = defineProps({
  products: {
    type: Array,
    required: true
  },
  count: {
    type: Number,
    required: true
  }
});

const emit = defineEmits(["deleteProduct"]);
const handleDeleteProduct = async (product: any) => {
  const { id } = product;
  await ky.delete(`/api/AdminProduit/${id}`);
  emit("deleteProduct", id);
};

async function redirectToProduct(id: number) {
  navigateTo(`/admin/products/${id}`);
}

const handleUpdateStock = ({ id, stocks }) => {
  const product = props.products.find(e => e.id === id);
  if (product) {
    product.stocks = stocks;
  }
};

console.log(props.products?.length);
let length = props.products?.length ;
const page = ref(1);
const itemsPerPage = 10;
console.log('products length ' , length);
const pageCount = computed(() => Math.ceil( length / itemsPerPage));
console.log('pageCount' ,pageCount.value);
const paginatedProducts = computed(() => {
  const start = (page.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return props.products?.slice(start, end);
});

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
  <Card class="flex flex-col h-[calc(100vh_-_7rem)] bg-transparent-10 rounded-xl p-5">
    <template #header>
      <div class="flex items-center py-2">
        <h2 class="font-bold text-2xl text-dominant-500 min-w-fit">Liste des produits</h2>
        <div class="w-full flex justify-end">
          <NuxtLink to="/admin/products/newproduct" class="w-fit p-4 rounded-xl bg-dominant-500 dark:bg-accent-500 text-text-50 font-semibold hover:shadow-dominant-400 dark:hover:shadow-accent-400 duration-200 hover:shadow-[0_0px_20px_0px]">
            Ajouter un produit
          </NuxtLink>
        </div>
      </div>
    </template>

    <template #content>
      <ul class="flex flex-col gap-3 overflow-y-scroll rounded-xl scrollbar-hide">
        <li v-for="product in paginatedProducts" :key="product.id" class="p-4 flex items-center gap-3 bg-transparent-10 hover:bg-secondary-200 rounded-xl cursor-pointer relative" @click="redirectToProduct(product.id)">
          <NuxtImg  :src="JSON.parse(product.image)[0]" :alt="product.name" class="w-28 rounded-xl border-2 border-white"/>
          <div class="flex flex-col">
            <span class="font-semibold text-lg text-text-900">{{ product.name }}</span>
            <span class="text-xs sm:text-base text-gray-500">{{ product.type }}</span>
            <div v-if="isRecentProduct(product.created_at)">
              <span class="text-xs sm:text-base text-red-500 font-bold">Nouveauté</span>
            </div>
            <span class="text-text-800">{{ product.price }} €</span>

            <div class="absolute right-4 bottom-3 gap-2 flex items-center">
              <ModalStock :product="product" @updateStock="handleUpdateStock" />
              <span class="bg-red-500 p-2 rounded lg:inline-block text-white lg:text-base" @click.stop="() => handleDeleteProduct(product)">Supprimer</span>
            </div>
          </div>
        </li>
      </ul>
    </template>

    <template #footer>
      <div class="flex justify-between text-ms items-center px-1">
        <UPagination v-model="page" :page-count="pageCount.value" :total="length" />
        <button  @click="downloadCsv" class=" p-3 rounded-lg text-white text-lg bg-dominant-500 hover:shadow-dominant-400  duration-200 hover:shadow-[0_0px_20px_0px]">télécharger fiche produit</button>
      </div>
    </template>
  </Card>
</template>

<style scoped></style>