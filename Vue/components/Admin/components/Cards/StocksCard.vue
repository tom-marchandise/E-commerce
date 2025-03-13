<script setup lang="ts">
import { ref } from 'vue';
import Card from "~/components/Admin/components/Cards/Card.vue";
import PromotionsModal from "~/components/Admin/components/Promotions/PromotionsModal.vue";
import { useFetch } from "@vueuse/core";
import ky from "ky";
import ModalPromotion from "~/components/Admin/components/ModalPromotion/ModalPromotion.vue";
import StocksModal from "~/components/Admin/components/Stocks/StocksModal.vue";
import ModalModifStock from "~/components/Admin/components/ModalStock/ModalModifStock.vue";

const { data: stocks, isFinished } = useFetch("/api/AdminProductInfo").json();
console.log(stocks)

const handleDeletePromotion = async (stock: any) => {
  const { id } = stock;
  await ky.delete(`/api/AdminProductInfo/${id}`);
  stocks.value = stocks.value.filter(p => p.id !== id);
};

const handlePromotionUpdate = (updatedPromotion: any) => {
  const index = promotions.value.findIndex(p => p.id === updatedPromotion.id);
  if (index !== -1) {
    promotions.value[index].new_price = updatedPromotion.new_price;
  }
};

const handleAddPromotion = (stocks) => {
  console.log(product);
  stocks.value.push(product);
}

function redirectToProduct(id: number) {
  navigateTo(`/admin/products/${id}`);
}
</script>

<template>

  <Card class="flex flex-col h-[calc(100vh_-_7rem)] bg-transparent-10 rounded-xl p-5">
    <template #header>
      <div class="flex items-center py-2">
        <h2 class="font-bold text-2xl text-dominant-500 min-w-fit">Produits en stock</h2>
        <div class="w-full flex justify-end">
          <StocksModal @addPromotion="handleAddPromotion"/>
        </div>
      </div>
    </template>

    <template #content>
      <ul class="flex flex-col gap-3 overflow-y-scroll rounded-xl scrollbar-hide">
        <li
            v-for="stock in stocks"
            :key="stock.id"
            class="p-4 flex items-center gap-3 bg-transparent-10 hover:bg-secondary-200 rounded-xl cursor-pointer relative"
        >

          <NuxtImg :src="JSON.parse(stock.product.image)[0]" :alt="stock.product.name" class="w-28 rounded-xl border-2 border-white"/>

          <div class="flex flex-col">
            <span class="sm:text-lg text-text-900 font-semibold">{{ stock.product.name }}</span>
            <span class="text-xs sm:text-base text-gray-500">Fournisseur : {{ stock.supplier }}</span>
            <span class="text-xs sm:text-base text-gray-500">Prix d'achat au fournisseur : {{ stock.buying_price }}€</span>
            <div class="text-sky-500 dark:text-dominant-500 flex flex-col">
              <span class="text-xs sm:text-base font-bold">Prix de vente : {{ stock.selling_price }}€</span>
              <span class="text-xs sm:text-base font-bold">Marge : {{ stock.marge }}€</span>
              <span class="text-xs sm:text-base font-bold">Quantité produits : {{ stock.quantity_arrival }}</span>
              <span class="text-xs sm:text-base font-bold">Date de la réception du lot : {{ stock.date_reception }}</span>
            </div>
      
            <div class="absolute right-4 bottom-3 gap-2 flex items-center">
              <button
                  class="bg-red-500 p-2 rounded lg:inline-block text-white lg:text-base"
                  @click.stop="() => handleDeletePromotion(stock)">
                Supprimer
              </button>
              <ModalModifStock
                  :stock="stock"
                  @updatePromotion="handlePromotionUpdate"
              />
            </div>
          </div>
        </li>
      </ul>
    </template>

    <template #footer>
      <div class="flex justify-between text-ms items-center px-1">
        <span class="text-gray-500 text-md" v-if="stock">{{ stock.length }} stock</span>
    
      </div>
    </template>
  </Card>
</template>
