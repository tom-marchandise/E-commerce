<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import jwt_decode from 'jwt-decode';

const id = ref(null);
const firstname = ref('');
const lastname = ref('');
const email = ref('');
const phone = ref('');
const street = ref('');
const city = ref('');
const state = ref('');
const zipcode = ref('');
const country = ref('');
const orders = ref([]);
const selectedTab = ref('enCours');
const showMore = ref(false);
const isDropdownOpen = ref(false);
const selectedPeriod = ref('');
const isUnrolled = ref(false)

onMounted(async () => {
  const token = localStorage.getItem('jwt');
  if (token) {
    const decodedToken = jwt_decode(token);
    id.value = decodedToken.id;
    email.value = decodedToken.email;

    try {
      const response = await fetch(`api/Auth/${id.value}`);
      if (!response.ok) {
        throw new Error("Failed to fetch user information");
      }
      const value = await response.json();
      firstname.value = value.first_name;
      lastname.value = value.last_name;
      phone.value = value.phone_number;

      const getAddress = await fetch(`api/Auth/GetAddress/${id.value}`);
      if (!getAddress.ok) {
        throw new Error("Erreur sur le fetch des adresses");
      }
      const address = await getAddress.json();
      if (address.length > 0) {
        street.value = address[0].street;
        city.value = address[0].city;
        state.value = address[0].state;
        zipcode.value = address[0].zipcode;
        country.value = address[0].country;
      }

      const getOrders = await fetch(`api/OrdersInfo/ByEmail/${email.value}`);
      if (!getOrders.ok) {
        throw new Error("Erreur sur le fetch des commandes");
      }
      const ordersData = await getOrders.json();
      orders.value = ordersData;
      console.log('Données des commandes', ordersData);
    } catch (error) {
      console.error("Error:", error);
    }
  } else {
    console.error("Token non trouvé");
  }
});


function formatDate(dateString) {
  if (!dateString) return 'Date inconnue';

  const date = new Date(dateString);
  if (isNaN(date)) return 'Date invalide';

  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('fr-FR', options);
}

const groupedOrders = computed(() => {
  const grouped = {};
  let filteredOrders = orders.value;

  console.log('Toutes les commandes:', orders.value);

  filteredOrders = selectedTab.value === 'enCours'
      ? filteredOrders.filter(order => order.status === 'en cours')
      : filteredOrders.filter(order => order.status === 'livré');

  console.log('Commandes après filtrage par statut:', filteredOrders);

  if (selectedPeriod.value === '3mois') {
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
    filteredOrders = filteredOrders.filter(order => new Date(order.created_at) >= threeMonthsAgo);
  } else if (selectedPeriod.value === '6mois') {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    filteredOrders = filteredOrders.filter(order => new Date(order.created_at) >= sixMonthsAgo);
  }

  const parseAddress = (addressString) => {
    try {
      return JSON.parse(addressString);
    } catch (error) {
      console.error('Erreur lors du parsing de l\'adresse:', error);
      return {};
    }
  };

  filteredOrders.forEach(order => {
    const deliveryAddress = parseAddress(order.delivery_address);
    const billingAddress = parseAddress(order.billing_address);

    if (!grouped[order.order_reference]) {
      grouped[order.order_reference] = {
        ...order,
        products: [],
        formatted_date: formatDate(order.created_at),
        delivery_address: deliveryAddress,
        billing_address: billingAddress,
      };
    }

    grouped[order.order_reference].products.push({
      ...order.product,
      image: JSON.parse(order.product.image),
    });
  });

  return Object.values(grouped);
});



const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const showMoreOrders = () => {
  isUnrolled.value = !isUnrolled.value
  showMore.value = !showMore.value;
};
</script>


<template>
  <!-- component -->
  <section>
    <div class="py-16">
      <div class="mx-auto max-w-6xl text-gray-500">
        <div class="relative">
          <div class="relative z-10 grid gap-3 grid-cols-6">
            <!-- info de l'user -->
            <div class="text-center col-span-full lg:col-span-2 overflow-hidden flex relative p-8 rounded-xl bg-white border border-gray-200 dark:border-gray-800 dark:bg-gray-900">
              <div class="size-fit m-auto relative">
                <p class="text-center font-semibold text-gray-950 dark:text-white text-2xl">Prénom*</p>
                <UTextarea class="text-center font-semibold text-gray-950 dark:text-white text-2xl" v-model="firstnameVal" :placeholder="firstname"/>
                <p class="text-center font-semibold text-gray-950 dark:text-white text-2xl">Nom*</p>
                <UTextarea class="text-center font-semibold text-gray-950 dark:text-white text-2xl" v-model="lastnameVal" :placeholder="lastname" />
              </div>
            </div>

            <div class="col-span-full sm:col-span-3 lg:col-span-2 overflow-hidden relative p-14 rounded-xl bg-white border border-gray-200 dark:border-gray-800 dark:bg-gray-900">
              <div class="mt-6 text-center relative z-10 space-y-2">
                <p class="text-center text-gray-800 text-2xl font-semibold transition group-hover:text-purple-950 dark:text-white">E-mail*</p>
                <UTextarea class="text-center font-medium text-gray-800 transition group-hover:text-purple-950 dark:text-white" v-model="emailVal" :placeholder="email" />
              </div>
            </div>

            <div class="text-center col-span-full sm:col-span-3 lg:col-span-2 overflow-hidden relative p-8 rounded-xl bg-white border border-gray-200 dark:border-gray-800 dark:bg-gray-900">
              <div class="mt-14 text-center relative z-10 space-y-2">
                <p class="text-center dark:text-gray-300 text-gray-700 text-2xl font-semibold">Numéro de téléphone*</p>
                <UTextarea class="text-center dark:text-gray-300 text-gray-700" v-model="phoneVal" :placeholder="phone"/>
              </div>
              <button type="button" @click="insertValues" class="text-center mt-10 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Valider</button>
            </div>

            <div class="w-full col-span-3 overflow-hidden relative p-8 rounded-xl bg-white border border-gray-200 dark:border-gray-800 dark:bg-gray-900">
              <div class="grid sm:grid-cols-2">
                <div class="flex flex-col justify-between relative z-10 space-y-12 lg:space-y-6">
                  <div class="space-y-2">
                    <p class="text-2xl font-semibold text-gray-800 transition group-hover:text-purple-950 dark:text-white">Adresse*</p>
                    <UTextarea class="text-lg font-medium text-gray-800 transition group-hover:text-purple-950 dark:text-white" v-model="streetVal" :placeholder="street"></UTextarea>
                    <p class="dark:text-gray-300 text-2xl font-semibold text-gray-700">Ville*</p>
                    <UTextarea class="dark:text-gray-300 text-gray-700" v-model="cityVal" :placeholder="city"></UTextarea>
                    <p class="dark:text-gray-300 text-2xl font-semibold text-gray-700">État</p>
                    <UTextarea class="dark:text-gray-300 text-gray-700" v-model="stateVal" :placeholder="state"></UTextarea>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-span-full lg:col-span-3 overflow-hidden relative p-8 rounded-xl bg-white border border-gray-200 dark:border-gray-800 dark:bg-gray-900">
              <div class="h-full grid sm:grid-cols-2">
                <div class="flex flex-col justify-between relative z-10 space-y-12 lg:space-y-6">
                  <div class="space-y-2">
                    <p class="text-2xl font-semibold text-gray-800 transition group-hover:text-purple-950 dark:text-white">Code postal*</p>
                    <UTextarea class="text-lg font-medium text-gray-800 transition group-hover:text-purple-950 dark:text-white" v-model="zipcodeVal" :placeholder="zipcode"></UTextarea>
                    <p class="dark:text-gray-300 text-2xl font-semibold text-gray-700">Pays*</p>
                    <UTextarea class="dark:text-gray-300 text-gray-700" v-model="countryVal" :placeholder="country"></UTextarea>
                  </div>
                  <button type="button" @click="insertAdress" class="text-center mt-10 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Valider</button>
                </div>
              </div>
            </div>

            <!-- commandes user avec onglets -->
            <div class="col-span-full lg:col-span-6 overflow-hidden relative p-8 rounded-xl bg-white border border-gray-200 dark:border-gray-800 dark:bg-gray-900">
              <div class="flex justify-between items-center">
                <div class="space-y-4">
                  <p class="text-2xl font-semibold text-text-900">Historique de commande</p>

                  <!-- onglets -->
                  <div class="flex space-x-4">
                    <button
                        @click="selectedTab = 'enCours'"
                        :class="selectedTab === 'enCours' ? 'text-accent-500 font-bold' : 'text-text-700'"
                        class="px-4 py-2 border-b-2"
                    >
                      En cours
                    </button>
                    <button
                        @click="selectedTab = 'livree'"
                        :class="selectedTab === 'livree' ? 'text-accent-500 font-bold' : 'text-gray-600'"
                        class="px-4 py-2 border-b-2"
                    >
                      Livrée
                    </button>
                  </div>
                </div>

                <!-- trier par -->
                <div class="relative inline-block text-left mt-12">
                  <div>
                    <button
                        type="button"
                        @click="toggleDropdown"
                        class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        aria-haspopup="false"
                        :aria-expanded="isDropdownOpen">
                      Trier par
                      <svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                      </svg>
                    </button>
                  </div>

                  <!-- menu déroulant -->
                  <div v-if="isDropdownOpen" class="absolute right-0 z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                    <div class="py-1" role="none">
                      <button @click="groupedOrders('3mois')" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full" role="menuitem">3 derniers mois</button>
                      <button @click="groupedOrders('6mois')" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full" role="menuitem">6 derniers mois</button>
                    </div>
                  </div>
                </div>
                
              </div>

              <ul>
                <li v-for="order in (showMore ? groupedOrders : groupedOrders.slice(0, 2))" :key="order.id" class="border-b py-4 text-text-900">
                  <p class="mb-6">Commande <strong class="text-dominant-500">#{{ order.order_reference }}</strong></p>
                  <p><strong>Passée le :</strong> {{ order.formatted_date }}</p>

                  <p><strong>Adresse de livraison :</strong>
                    <span v-if="order.delivery_address">
          {{ order.delivery_address.firstname }} {{ order.delivery_address.name }},
          {{ order.delivery_address.street }},
          {{ order.delivery_address.zipcode }} {{ order.delivery_address.city }},
          {{ order.delivery_address.country }}
        </span>
                    <span v-else>Adresse non disponible</span>
                  </p>

                  <p><strong>Statut :</strong> {{ order.status }}</p>
                  <p><strong>Articles :</strong></p>
                  <ul>
                    <li v-for="product in order.products" :key="product.id" class="flex text-text-900 items-center mb-2">
                      <router-link :to="`/categories/${product.category}/${product.id}`" class="flex items-center">
                        <img
                            :src="product.image[0]"
                            alt="Product Image"
                            class="w-16 h-auto mr-4 border border-gray-300 p-1"
                        >
                        {{ product.name }}
                      </router-link>
                    </li>
                  </ul>
                </li>
              </ul>
              

              <div v-if="groupedOrders.length > 2" class="text-center mt-4">
                <button
                    @click="showMoreOrders"
                    class="text-accent-500 hover:underline"
                >
                  {{isUnrolled ? "Voir moins" : "Voir plus"}}
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </section>
</template>


<style scoped>
</style>
