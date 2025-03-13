<script setup lang="ts">
import { useFetch } from "@vueuse/core";
import ky from "ky";
import { ref, computed } from "vue";

const isOpen = ref(false);
const emit = defineEmits(["addPromotion"]);
const { data: products, isFinished } = useFetch('/api/AdminProduit/WithoutPromotions').json();

// Ajoutez une propriété réactive pour la barre de recherche
const searchQuery = ref('');

// Méthode calculée pour filtrer les produits
const filteredProducts = computed(() => {
  if (!searchQuery.value) return products.value;
  return products.value.filter(product =>
      product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const handleSubmit = async (product) => {
  try {
    let newPrice = parseFloat(product.temp_new_price);

    if (isNaN(newPrice) && product.temp_percentage) {
      newPrice = parseFloat((product.price * (1 - product.temp_percentage / 100)).toFixed(2));
    }

    const data = {
      product_id: product.id,
      new_price: newPrice,
      percentage: parseFloat(product.temp_percentage),
      duration: product.temp_end_date,
      promotion_description: "PROMO"
    };

    const response = await ky.post('/api/Promotions', {
      json: data
    });

    if (response.ok) {
      isOpen.value = false;
      emit('addPromotion', product);
    }
  } catch (e) {
    console.log(e);
  }
};
</script>

<template>
  <div v-if="isFinished">
    <button label="Ajouter une promotion" @click="isOpen = true" class="w-fit p-4 rounded-xl bg-dominant-500 dark:bg-accent-500 text-text-50 font-semibold hover:shadow-dominant-400 dark:hover:shadow-accent-400 duration-200 hover:shadow-[0_0px_20px_0px]">Ajouter une promotion</button>
    <UModal v-model="isOpen" :overlay="false" :ui="{ constrained: 'max-w-2xl' }">
      <div class="p-4 max-h-[50rem] overflow-y-scroll">

        <!-- Ajoutez une barre de recherche ici -->
        <input v-model="searchQuery" type="text" placeholder="Rechercher un produit..." class="p-2 w-full outline-0 border rounded-lg mb-4" />

        <ul class="flex flex-col gap-2">
          <li class="flex flex-col justify-center gap-3 border-b py-3" v-for="product in filteredProducts" :key="product.id">
            <form @submit.prevent="handleSubmit(product)">
              <div class="flex items-center gap-3">
                <img :src="JSON.parse(product.image)[0]" class="w-24" :alt="product.name">
                <span class="text-xl font-bold">{{ product.name }}</span>
                <span class="text-xl">{{ product.price }}€</span>
              </div>
              <div class="flex gap-3">
                <span>Date de fin</span>
                <input v-model="product.temp_end_date" type="date" />
              </div>
              <div class="flex gap-3 justify-end">
                <input v-model="product.temp_new_price" type="number" min="0" :max="product.price" step=".01" placeholder="Fixer un nouveau prix" class="p-2 w-full outline-0 border rounded-lg" />
                <input v-model="product.temp_percentage" type="number" min="0" max="100" step=".01" placeholder="Fixer un pourcentage" class="p-2 w-full outline-0 border rounded-lg" />
                <UButton type="submit">Ajouter</UButton>
              </div>
            </form>
          </li>
        </ul>
      </div>
    </UModal>
  </div>
</template>

