<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { CheckBadgeIcon } from '@heroicons/vue/24/outline';
import Chatbot from '@/components/Chatbot.vue';


const route = useRoute();
const orderId = ref(route.params.id);
const item = ref(null);
const trackingInfo = ref(null);

const fetchOrderDetails = async () => {
  console.log("Début de fetchOrderDetails");
  try {
    const orderResponse = await axios.get(`/api/OrdersInfo/Reference/${orderId.value}`);
    console.log("Détail commande:", orderResponse.data);
    item.value = orderResponse.data[0];

    if (item.value) {
      console.log("Commande trouvée:", item.value);

      const trackingResponse = await axios.get(`/api/TrackingUpdate/${item.value.id}`);
      console.log("Tracking:", trackingResponse.data);
      trackingInfo.value = trackingResponse.data;

      const shippingResponse = await axios.get(`/api/ShippingCost/${item.value.shipping_cost_id}`);
      console.log("Frais de port:", shippingResponse.data);
      item.value.shippingCostDetails = shippingResponse.data;
    } else {
      console.log("Aucune commande trouvée");
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des détails de la commande:', error);
    item.value = null;
    trackingInfo.value = null;
  }
};


const formatDate = (timestamp) => {
  return new Date(timestamp).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

onMounted(fetchOrderDetails);
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-black p-10">
    <div class="bg-transparent-10 border text-text-900 border-dominant-500 shadow-lg rounded-lg p-8 w-full max-w-4xl">
      <h1 class="text-2xl font-bold mb-4 text-center">Suivi de votre commande</h1>

      <div v-if="item" class="mt-6">
        <h2 class="text-lg font-semibold">
          Commande <span class="text-[#4084fe]">#{{ item.order_reference }}</span>
        </h2>
        <p class="text-text-700 mt-2">
          <span class="font-bold">Statut : </span>
          <span :class="statusTextClass">{{ item.status }}</span>
        </p>
        <p class="text-text-700 mt-2" v-if="item.shippingCostDetails">
          <span class="font-bold">Pays destinataire : </span>
          {{ item.shippingCostDetails.country }}
        </p>
        <p class="text-text-700 mt-2" v-if="item.shippingCostDetails">
          <span class="font-bold">Mode de livraison : </span>
          {{ item.shippingCostDetails.delivery_type }}
        </p>
        <p class="text-text-700 mt-2" v-if="item.shippingCostDetails">
          <span class="font-bold">Frais de port : </span>
          {{ item.shippingCostDetails.price }} €
        </p>
      </div>

      <div v-if="trackingInfo && trackingInfo.length" class="mt-6">
        <h3 class="text-lg font-semibold mt-4">Étapes d'acheminement</h3>
        <table class="min-w-full mt-2">
          <thead>
          <tr>
            <th class="border-b-2 border-gray-300 text-left py-2 px-4">DATES</th>
            <th class="border-b-2 border-gray-300 text-left py-2 px-4">ÉTAPES</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="update in trackingInfo" :key="update.id">
            <td class="border-b border-gray-200 py-2 px-4">
              {{ formatDate(update.timestamp) }}
            </td>
            <td class="border-b border-gray-200 py-2 px-4">
              <div class="flex items-center bg-[#f7f7f7] p-2 rounded border-l-4 border-green-500">
                <CheckBadgeIcon class="h-6 w-6 text-green-500 mr-2" />
                <span>{{ update.status }}</span>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>

      <div v-else class="mt-6">
        <p class="text-text-700">Aucune information de suivi disponible.</p>
      </div>

      <button @click="fetchOrderDetails" class="mt-4 w-full bg-black dark:bg-white text-white dark:text-black py-2 rounded-lg">
        Rafraîchir le suivi
      </button>
    </div>

    <Chatbot />
  </div>
</template>
