<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const orderReference = ref('');
const orders = ref<any[]>([]);
const userEmail = ref('');
const showModal = ref(false);
const router = useRouter();
const isLoggedIn = ref(false);

const checkAuthToken = () => {
  const token = localStorage.getItem('jwt');
  isLoggedIn.value = !!token;
};

onMounted(() => {
  checkAuthToken();
});

const parseImages = (imageString: string) => {
  try {
    return JSON.parse(imageString);
  } catch (error) {
    console.error('Erreur lors du parsing des images:', error);
    return [];
  }
};

const parseAddress = (addressString: string) => {
  try {
    return JSON.parse(addressString);
  } catch (error) {
    console.error('Erreur lors du parsing de l\'adresse:', error);
    return {};
  }
};

const fetchOrdersByReference = async () => {
  try {
    const response = await axios.get(`/api/OrdersInfo/Reference/${orderReference.value}`);
    console.log(response.data);
    orders.value = response.data.map(order => {
      return {
        ...order,
        delivery_address: parseAddress(order.delivery_address),
        billing_address: parseAddress(order.billing_address),
      };
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des commandes:', error);
    orders.value = [];
  }
};

const goToTracking = (order) => {
  if (order && order.order_reference && order.deliveryId) {
    router.push({
      path: `/orders/${order.order_reference}`,
      query: { delivery: order.deliveryId }
    });
  } else {
    console.error('Détails de la commande manquants ou invalides');
  }
};

const downloadInvoice = async (orderReference) => {
  try {
    const response = await axios.get(`/api/Invoice/${orderReference}`, {
      responseType: 'blob',
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `facture_${orderReference}.pdf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Erreur lors du téléchargement de la facture:', error);
  }
};

const sendInvoiceByEmail = async (orderReference) => {
  if (!userEmail.value) {
    alert("Veuillez entrer une adresse e-mail.");
    return;
  }

  try {
    await axios.post('/api/Invoice/send', {
      orderReference,
      userEmail: userEmail.value
    });

    alert("La facture a été envoyée à votre adresse e-mail.");
    showModal.value = false;
  } catch (error) {
    console.error('Erreur lors de l\'envoi de la facture par e-mail:', error);
    alert("Une erreur est survenue lors de l'envoi de la facture.");
  }
};
</script>

<template>
  <div class="flex items-center text-text-900 justify-center min-h-screen bg-gray-100 dark:bg-black">
    <div class="text-text-900 bg-transparent-10 border border-dominant-100 shadow-lg rounded-lg p-12 w-full max-w-6xl">
      <h1 class="text-text-900 text-2xl font-bold mb-4 text-center">Commandes</h1>

      <div class="flex items-center justify-center mb-4">
        <p class=" mr-4 font-semibold text-center">Numéro de commande</p>
        <input
            v-model="orderReference"
            type="text"
            placeholder="Entrez ici votre référence de commande"
            class="text-center w-1/3 px-2 py-2 border border-[#D2D2D2] rounded-lg bg-transparent text-text-900 focus:outline-none focus:ring-2"
            required
        />
        <button
            type="submit"
            class="bg-dominant-500 text-white py-2 px-4 rounded-lg ml-5 hover:bg-dominant-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
            @click="fetchOrdersByReference"
        >
          Valider
        </button>
      </div>

      <div v-if="!orderReference && !orders.length" class="text-gray-600 text-justify mt-10">
        <p class="text-center dark:text-white text-2xl font-bold mb-4">Besoin d'aide pour trouver votre commande ?</p>
        <p>Vérifiez vos <strong>e-mails de confirmation</strong>, vous devriez y trouver votre numéro de commande.</p>
        <p v-if="!isLoggedIn">
          Vous pouvez également vous
          <router-link to="/auth/login" class="text-accent-500 underline">connecter</router-link>
          à votre compte et consulter votre
          <router-link to="/profil" class="text-accent-500 underline">historique de commandes</router-link>
          pour retrouver votre numéro de commande.
        </p>
        <p v-else>
          Vous pouvez également consulter votre
          <router-link to="/profil" class="text-accent-500 underline">historique de commandes</router-link>
          pour retrouver votre numéro de commande.
        </p>
      </div>

      <div class="mt-4" v-if="orders.length">
        <div class="mb-6 border-b border-gray-300 pb-4 mb-10">
          <h2 class="text-lg font-semibold">
            Commande <span class="text-accent-500">#{{ orders[0].order_reference }}</span>
          </h2>

          <div class="flex justify-between mt-4">
            <div class="flex-1">
              <p class="text-text-700 font-bold">Statut : {{ orders[0].status }}</p>
              <p class="text-text-700 mt-2">
                <span class="font-bold">Adresse de livraison :</span>
                {{ orders[0].delivery_address.firstname }} {{ orders[0].delivery_address.name }},
                {{ orders[0].delivery_address.street }}, {{ orders[0].delivery_address.zipcode }}
                {{ orders[0].delivery_address.city }}, {{ orders[0].delivery_address.country }}
              </p>
              <p class="text-text-700 mt-2">
                <span class="font-bold">Adresse de facturation :</span>
                {{ orders[0].billing_address.firstname }} {{ orders[0].billing_address.name }},
                {{ orders[0].billing_address.street }}, {{ orders[0].billing_address.zipcode }}
                {{ orders[0].billing_address.city }}, {{ orders[0].billing_address.country }}
              </p>
            </div>
            <div class="ml-4">
              <div class="flex mt-2">
                <button
                    class="bg-white border border-gray-300 text-black py-1 px-3 rounded-lg hover:bg-gray-100 mr-2"
                    @click="goToTracking(orders[0])"
                    v-if="orders.length > 0"
                >
                  Suivre ma commande
                </button>
              </div>
            </div>
          </div>

          <!-- liste des articles -->
          <div v-for="item in orders" :key="item.id" class="mt-4 flex items-center">
            <router-link :to="`/categories/${item.product.category}/${item.product.id}`" class="flex items-center">
              <img
                  v-if="item.product.image"
                  :src="parseImages(item.product.image)[0]"
                  alt="Image du produit"
                  class="w-32 h-32 border border-gray-300 rounded-lg"
              />
            </router-link>
            <div class="ml-4">
              <p class="text-lg font-bold">{{ item.product.name }}</p>
              <p class="text-text-700">Prix : {{ item.product.price }} €</p>
            </div>
          </div>
        </div>
      </div>

      <div v-else>
        <p class="text-text-700" v-if="orderReference">Aucune commande trouvée pour cette référence.</p>
      </div>
    </div>

    <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div class="bg-white rounded-lg p-6 max-w-sm w-full">
        <h2 class="text-lg font-semibold mb-4">Envoyer ma facture par mail</h2>
        <input
            v-model="userEmail"
            type="email"
            placeholder="Entrez votre adresse e-mail"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg"
            required
        />
        <div class="mt-4 flex justify-end">
          <button
              type="button"
              class="bg-gray-300 text-black py-2 px-4 rounded-lg hover:bg-gray-400 mr-2"
              @click="showModal = false"
          >
            Annuler
          </button>
          <button
              type="button"
              class="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
              @click="sendInvoiceByEmail(orders[0].order_reference)"
          >
            Envoyer
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

