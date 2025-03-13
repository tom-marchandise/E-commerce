<script setup lang="ts">
import { ref } from 'vue';
import ky from 'ky';

const props = defineProps({
  stock: {
    type: Object,
    required: true,
  },
});

const isOpen = ref(false);
const quantityArrival = ref(props.stock.quantity_arrival);
const buyingPrice = ref(props.stock.buying_price);
const sellingPrice = ref(props.stock.selling_price);
const marge = ref(props.stock.marge);
const supplier = ref(props.stock.supplier);
const dateReception = ref(props.stock.date_reception);

const emit = defineEmits(['updateStock']);

const onSubmit = async () => {
  try {
    const payload = {
      id: props.stock.id,
      product_id: props.stock.product_id, 
      quantity_arrival: quantityArrival.value,
      buying_price: buyingPrice.value,
      selling_price: sellingPrice.value,
      marge: marge.value,
      supplier: supplier.value,
      date_reception: dateReception.value,
    };

    const response = await ky.put(`/api/AdminProductInfo/${props.stock.id}`, {
      json: payload,
    });

    if (response.ok) {
      console.log(`Stock du produit : ${props.stock.product.name} mis à jour avec succès.`);
      emit('updateStock', payload);
      isOpen.value = false;
    } else {
      console.error('Erreur lors de la mise à jour du stock');
    }
  } catch (error) {
    console.error('Erreur lors de la requête PUT:', error);
  }
};

const openModal = () => {
  isOpen.value = true;
  console.log(props.stock);
};

const closeModal = () => {
  isOpen.value = false;
};
</script>

<template>
  <button class="bg-blue-500 text-white p-2 rounded hover:bg-blue-600" @click="openModal">Modifier Stock</button>

  <UModal v-model="isOpen">
    <form @submit.prevent="onSubmit" class="p-4 bg-white rounded shadow space-y-4">
      <h2 class="text-xl font-bold mb-4">Modifier le Stock</h2>

      <div class="flex flex-col space-y-2">
        <label class="text-gray-700">Nom du produit:</label>
        <input type="text" :value="props.stock.product.name" disabled class="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>

      <div class="flex flex-col space-y-2">
        <label class="text-gray-700">Quantité d'arrivée:</label>
        <input v-model="quantityArrival" type="number" min="0" class="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>

      <div class="flex flex-col space-y-2">
        <label class="text-gray-700">Prix d'achat:</label>
        <input v-model="buyingPrice" type="number" min="0" step="0.01" class="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>

      <div class="flex flex-col space-y-2">
        <label class="text-gray-700">Prix de vente:</label>
        <input v-model="sellingPrice" type="number" min="0" step="0.01" class="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>

      <div class="flex flex-col space-y-2">
        <label class="text-gray-700">Marge:</label>
        <input v-model="marge" type="number" min="0" step="0.01" class="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>

      <div class="flex flex-col space-y-2">
        <label class="text-gray-700">Fournisseur:</label>
        <input v-model="supplier" type="text" class="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>

      <div class="flex flex-col space-y-2">
        <label class="text-gray-700">Date de réception:</label>
        <input v-model="dateReception" type="date" class="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>

      <div class="flex justify-end space-x-2">
        <button type="button" class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600" @click="closeModal">Annuler</button>
        <button type="submit" class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Enregistrer</button>
      </div>
    </form>
  </UModal>
</template>

<style scoped>
</style>
