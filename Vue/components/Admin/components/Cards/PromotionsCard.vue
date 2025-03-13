<script setup lang="ts">
import { ref } from 'vue';
import Card from "~/components/Admin/components/Cards/Card.vue";
import PromotionsModal from "~/components/Admin/components/Promotions/PromotionsModal.vue";
import { useFetch } from "@vueuse/core";
import ky from "ky";
import ModalPromotion from "~/components/Admin/components/ModalPromotion/ModalPromotion.vue";

const { data: promotions, isFinished } = useFetch("/api/Promotions").json();

const handleDeletePromotion = async (promotion: any) => {
  const { id } = promotion;
  await ky.delete(`/api/Promotions/${id}`);
  promotions.value = promotions.value.filter(p => p.id !== id);
};

const handlePromotionUpdate = (updatedPromotion: any) => {
  const index = promotions.value.findIndex(p => p.id === updatedPromotion.id);
  if (index !== -1) {
    promotions.value[index].new_price = updatedPromotion.new_price;
  }
};

const handleAddPromotion = (product) => {
  console.log(product);
  promotions.value.push(product);
}

function redirectToProduct(id: number) {
  navigateTo(`/admin/products/${id}`);
}
</script>

<template>
  <Card class="flex flex-col h-[calc(100vh_-_7rem)] bg-transparent-10 rounded-xl p-5">
    <template #header>
      <div class="flex items-center py-2">
        <h2 class="font-bold text-2xl text-dominant-500 min-w-fit">Liste des catégories</h2>
        <div class="w-full flex justify-end">
<!--          <NuxtLink to="/admin/categories/add" class="w-fit p-4 rounded-xl bg-dominant-500 dark:bg-accent-500 text-text-50 font-semibold hover:shadow-dominant-400 dark:hover:shadow-accent-400 duration-200 hover:shadow-[0_0px_20px_0px]">-->
<!--            Ajouter une promotion-->
<!--          </NuxtLink>-->
          <ModalPromotion @addPromotion="handleAddPromotion"/>
        </div>
      </div>
    </template>


    <template #content>
      <ul class="flex flex-col flex flex-col gap-3 overflow-y-scroll rounded-xl scrollbar-hide">
        <li v-for="promotion in promotions" :key="promotion.id" class=" p-4 flex items-center gap-3 bg-transparent-10 rounded-xl relative">
          <NuxtImg :src="JSON.parse(promotion.product.image)[0]" :alt="promotion.product.name" class="w-28 rounded-xl border-2 border-white"/>
          <div class="flex flex-col">
            <span class="sm:text-lg font-semibold text-text-900">{{ promotion.product.name }}</span>
            <span class="text-xs sm:text-base text-text-800">Prix de vente : {{ promotion.product.price }}€</span>
            <span v-if="promotion.percentage && promotion.percentage > 0" class="text-xs sm:text-base text-text-800">Pourcentage : {{ promotion.percentage }}%</span>
            <span class="text-xs sm:text-base text-accent-500 font-bold">Prix en promotion : {{ promotion.new_price }}€</span>
            <div class="absolute right-4 bottom-3 gap-2 flex items-center">
              <button
                  class="bg-red-500 p-2 rounded lg:inline-block text-white lg:text-base"
                  @click.stop="() => handleDeletePromotion(promotion)">
                Supprimer
              </button>
              <PromotionsModal
                  :promotion="promotion"
                  @updatePromotion="handlePromotionUpdate"
              />
            </div>
          </div>
        </li>
      </ul>
    </template>

    <template #footer>
      <div class="flex justify-between text-ms items-center px-1">
        <span class="text-md text-accent-500" v-if="promotions">{{ promotions.length }} promotions</span>
      </div>
    </template>
  </Card>
</template>
