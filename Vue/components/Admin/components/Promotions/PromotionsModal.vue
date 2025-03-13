<script setup lang="ts">
import { ref, watch } from 'vue';
import ky from 'ky';

const props = defineProps({
  promotion: {
    type: Object,
    required: true,
  },
});

const isOpen = ref(false);
const newPrice = ref(props.promotion.new_price);
const discountPercentage = ref(props.promotion.percentage || '');
const duration = ref(props.promotion.duration);
const promotionDescription = ref(props.promotion.promotion_description);

const emit = defineEmits(['updatePromotion']);


watch(discountPercentage, (newVal) => {
  if (newVal) {
    const originalPrice = props.promotion.product.price;
    newPrice.value = (originalPrice - (originalPrice * (newVal / 100))).toFixed(2);
  }
});

const onSubmit = async () => {
  try {
    const payload = {
      id: props.promotion.id,
      product_id: props.promotion.product.id,
      new_price: newPrice.value,
      percentage: discountPercentage.value,
      duration: duration.value,
      promotion_description: promotionDescription.value,
      updated_at: new Date().toISOString(),
    };

    const response = await ky.put(`/api/Promotions/${props.promotion.id}`, {
      json: payload,
    });

    if (response.ok) {
      console.log(`Promotion du produit : ${props.promotion.product.name} mise à jour avec succès, nouveau prix : ${newPrice.value}€, pourcentage : ${discountPercentage.value}%`);
      emit('updatePromotion', payload);
      isOpen.value = false;
    } else {
      console.error('Erreur lors de la mise à jour de la promotion');
    }
  } catch (error) {
    console.error('Erreur lors de la requête PUT:', error);
  }
};

const openModal = () => {
  isOpen.value = true;
  console.log(props.promotion);
};

const closeModal = () => {
  isOpen.value = false;
};
</script>

<template>
  <button class="bg-blue-500 text-white p-2 rounded hover:bg-blue-600" @click="openModal">Modifier</button>

  <UModal v-model="isOpen">
    <form @submit.prevent="onSubmit" class="p-4 bg-white rounded shadow space-y-4">
      <h2 class="text-xl font-bold mb-4">Modifier la promotion</h2>

      <div class="flex flex-col space-y-2">
        <label class="text-gray-700">Nom du produit:</label>
        <input type="text" :value="props.promotion.product.name" disabled class="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>

      <div class="flex flex-col space-y-2">
        <label class="text-gray-700">Prix actuel:</label>
        <input type="text" :value="props.promotion.product.price + ' €'" disabled class="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>

      <div class="flex flex-col space-y-2">
        <label class="text-gray-700">Nouveau prix en promotion:</label>
        <input v-model="newPrice" type="number" min="0" step=".01" class="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>

      <div class="flex flex-col space-y-2">
        <label class="text-gray-700">Pourcentage de réduction :</label>
        <input v-model="discountPercentage" type="number" min="0" max="100" step=".01" class="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>

      <div class="flex flex-col space-y-2">
        <label class="text-gray-700">Durée de la promotion:</label>
        <input v-model="duration" type="date" class="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>

      <div class="flex flex-col space-y-2">
        <label class="text-gray-700">Description de la promotion:</label>
        <input v-model="promotionDescription" type="text" class="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
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
