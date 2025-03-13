<script setup lang="ts">
import { useFetch } from "@vueuse/core";
import ky from "ky";
import { ref, computed } from "vue";

const isOpen = ref(false);
const emit = defineEmits(["addStock"]);
const { data: products, isFinished } = useFetch('/api/AdminProduit').json();

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
    const data = {
      product_id: product.id,
      quantity_arrival: parseInt(product.temp_quantity_arrival, 10),
      buying_price: parseInt(product.temp_buying_price, 10),
      selling_price: parseInt(product.temp_selling_price, 10),
      marge: parseInt(product.temp_marge, 10),
      supplier: product.temp_supplier,
      date_reception: product.temp_date_reception
    };

    const response = await ky.post('/api/AdminProductInfo', {
      json: data
    });
    console.log(data);

    if (response.ok) {
      isOpen.value = false;
      emit('addStock', product);
    }
  } catch (e) {
    console.log(e);
  }
};
</script>

<template>
  <div v-if="isFinished">
    <button label="Ajouter du stock" @click="isOpen = true" class="w-fit p-4 rounded-xl bg-dominant-500 dark:bg-accent-500 text-text-50 font-semibold hover:shadow-dominant-400 dark:hover:shadow-accent-400 duration-200 hover:shadow-[0_0px_20px_0px]">Ajouter du stock</button>
    <UModal v-model="isOpen" :overlay="false" :style="{ maxWidth: '800px', width: '100%' }">
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

              <div class="flex flex-col gap-3">
                <label>
                  <span>Date de réception :</span>
                  <input v-model="product.temp_date_reception" type="date" placeholder="Sélectionnez une date" class="p-2 w-full outline-0 border rounded-lg" />
                </label>
              </div>

              <div class="flex flex-col gap-3">
                <label>
                  <span>Quantité arrivée :</span>
                  <input v-model="product.temp_quantity_arrival" type="number" min="0" step="1" placeholder="Entrez la quantité" class="p-2 w-full outline-0 border rounded-lg" />
                </label>
              </div>

              <div class="flex flex-col gap-3">
                <label>
                  <span>Prix d'achat :</span>
                  <input v-model="product.temp_buying_price" type="number" min="0" step="0.01" placeholder="Entrez le prix d'achat" class="p-2 w-full outline-0 border rounded-lg" />
                </label>
              </div>

              <div class="flex flex-col gap-3">
                <label>
                  <span>Prix de vente :</span>
                  <input v-model="product.temp_selling_price" type="number" min="0" step="0.01" placeholder="Entrez le prix de vente" class="p-2 w-full outline-0 border rounded-lg" />
                </label>
              </div>

              <div class="flex flex-col gap-3">
                <label>
                  <span>Marge :</span>
                  <input v-model="product.temp_marge" type="number" min="0" step="0.01" placeholder="Entrez la marge" class="p-2 w-full outline-0 border rounded-lg" />
                </label>
              </div>

              <div class="flex flex-col gap-3">
                <label>
                  <span>Fournisseur :</span>
                  <input v-model="product.temp_supplier" type="text" placeholder="Entrez le nom du fournisseur" class="p-2 w-full outline-0 border rounded-lg" />
                </label>
              </div>

              <div class="flex justify-end">
                <UButton type="submit">Ajouter</UButton>
              </div>
            </form>
          </li>
        </ul>
      </div>
    </UModal>
  </div>
</template>



<style scoped>

</style>