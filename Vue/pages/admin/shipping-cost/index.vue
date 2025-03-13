<script setup lang="ts">
import { ref, onMounted } from "vue";
import NavbarDesktop from "~/components/Admin/components/NavbarDesktop/NavbarDesktop.vue";
import {definePageMeta} from "~/.nuxt/imports";

definePageMeta({
  layout: 'admin'
});

const shippingCosts = ref([]);
const newCountry = ref("");
const newDeliveryType = ref("");
const newPrice = ref(0);
const editId = ref<number | null>(null);
const isEditing = ref(false);

const errorMessagesAdd = ref({
  country: "",
  deliveryType: "",
  price: ""
});

const errorMessagesUpdate = ref({
  country: "",
  deliveryType: "",
  price: ""
});

const showModalAdd = ref(false);
const showModalUpdate = ref(false);

const formatDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
  return date.toLocaleDateString('fr-FR', options);
};

const fetchShippingCosts = async () => {
  const response = await fetch('/api/ShippingCost', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    shippingCosts.value = await response.json();
  }
};

// ajouter un frais de port
const addShippingCost = async () => {
  errorMessagesAdd.value = { country: "", deliveryType: "", price: "" };
  let isValid = true;

  const countryPattern = /^[A-Za-zÀ-ÿ\s]+$/;
  if (!countryPattern.test(newCountry.value)) {
    errorMessagesAdd.value.country = "Valeur erronée pour le champ Pays, texte attendu.";
    isValid = false;
  }

  if (!countryPattern.test(newDeliveryType.value)) {
    errorMessagesAdd.value.deliveryType = "Valeur erronée pour le champ Livraison, texte attendu.";
    isValid = false;
  }

  if (isNaN(newPrice.value) || newPrice.value <= 0) {
    errorMessagesAdd.value.price = "Valeur erronée, prix attendu.";
    isValid = false;
  }

  if (isValid) {
    const response = await fetch('/api/ShippingCost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        country: newCountry.value,
        delivery_type: newDeliveryType.value,
        price: newPrice.value
      }),
    });

    if (response.ok) {
      const data = await response.json();
      shippingCosts.value.push(data);
      resetFormAdd();
    } else {
      showModalAdd.value = true;
    }
  } else {
    showModalAdd.value = true;
  }
};

// modifier à jour un frais de port
const updateShippingCost = async (id: number) => {
  const response = await fetch(`/api/ShippingCost/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: id,
      country: newCountry.value,
      delivery_type: newDeliveryType.value,
      price: newPrice.value
    }),
  });

  if (response.ok) {
    const index = shippingCosts.value.findIndex(cost => cost.id === id);
    if (index !== -1) {
      shippingCosts.value[index] = { id, country: newCountry.value, delivery_type: newDeliveryType.value, price: newPrice.value };
    }
    resetFormUpdate();
  } else {
    showModalUpdate.value = true;
  }
};


const saveShippingCost = async () => {
  if (isEditing.value) {
    await updateShippingCost(editId.value);
  } else {
    await addShippingCost();
  }
};

const editShippingCost = (cost) => {
  newCountry.value = cost.country;
  newDeliveryType.value = cost.delivery_type;
  newPrice.value = cost.price;
  editId.value = cost.id;
  isEditing.value = true;
};

const deleteShippingCost = async (id: number) => {
  const response = await fetch(`/api/ShippingCost/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    shippingCosts.value = shippingCosts.value.filter(cost => cost.id !== id);
  }
};

const resetFormAdd = () => {
  newCountry.value = "";
  newDeliveryType.value = "";
  newPrice.value = 0;
  errorMessagesAdd.value = { country: "", deliveryType: "", price: "" };
  showModalAdd.value = false;
  isEditing.value = false;
};

const resetFormUpdate = () => {
  newCountry.value = "";
  newDeliveryType.value = "";
  newPrice.value = 0;
  errorMessagesUpdate.value = { country: "", deliveryType: "", price: "" };
  showModalUpdate.value = false;
  editId.value = null;
  isEditing.value = false;
};

onMounted(fetchShippingCosts);
</script>

<template>
  <NuxtLayout>
  <div class="min-h-screen flex justify-center items-center py-10 bg-transparent-10 text-text-900">
    <div class="rounded-lg shadow-lg p-5 w-1/2 max-w-screen-lg space-y-6 bg-transparent-10">
      <div class="flex justify-between items-center mb-4">
        <span class="text-gray-400">{{ formatDate(new Date()) }}</span>
        <button @click="exportToPDF"
                class="px-4 py-2 border border-gray-300 bg-white text-black rounded-3xl hover:bg-gray-100">
          Exporter CSV
        </button>
      </div>

      <h1 class="text-2xl font-bold text-center mb-6 text-dominant-500">Gestion des frais de port</h1>

      <div>
        <h2 class="text-xl font-semibold mb-4">Frais de port disponibles :</h2>
        <ul class="space-y-2">
          <li v-for="cost in shippingCosts" :key="cost.id" class="flex justify-between items-center p-4 border rounded">
            <span>{{ cost.country }}, {{ cost.delivery_type }} : {{ cost.price }}€</span>
            <div class="flex space-x-2">
              <button @click="editShippingCost(cost)" class="text-blue-500 hover:text-blue-700">Modifier</button>
              <button @click="deleteShippingCost(cost.id)" class="text-red-500 hover:text-red-700">Supprimer</button>
            </div>
          </li>
        </ul>
      </div>
      <div>
        <h2 class="text-xl font-semibold mb-4 mt-6">Ajouter un nouveau frais de port</h2>
        <div class="flex space-x-4">
          <div class="w-1/3">
            <input v-model="newCountry" type="text" placeholder="Nom du pays" class="w-full p-2 border rounded"/>
          </div>

          <div class="w-1/3">
            <input v-model="newDeliveryType" type="text" placeholder="Type de livraison" class="w-full p-2 border rounded"/>
          </div>

          <div class="w-1/3">
            <input v-model="newPrice" type="number" placeholder="Prix" class="w-full p-2 border rounded"/>
          </div>

          <button @click="saveShippingCost" class="px-4 py-2 bg-[#22c55d] text-white rounded-3xl">
            {{ isEditing ? "Modifier" : "Ajouter" }}
          </button>
        </div>
      </div>
    </div>

    <div v-if="showModalAdd" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white rounded-lg p-5 w-1/3">
        <h2 class="text-xl font-semibold mb-4">Erreur(s) d'ajout</h2>
        <ul>
          <li v-if="errorMessagesAdd.country" class="text-red-500">{{ errorMessagesAdd.country }}</li>
          <li v-if="errorMessagesAdd.deliveryType" class="text-red-500">{{ errorMessagesAdd.deliveryType }}</li>
          <li v-if="errorMessagesAdd.price" class="text-red-500">{{ errorMessagesAdd.price }}</li>
        </ul>
        <button @click="showModalAdd = false" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
          Fermer
        </button>
      </div>
    </div>

    <div v-if="showModalUpdate" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white rounded-lg p-5 w-1/3">
        <h2 class="text-xl font-semibold mb-4">Erreur(s) de mise à jour</h2>
        <ul>
          <li v-if="errorMessagesUpdate.country" class="text-red-500">{{ errorMessagesUpdate.country }}</li>
          <li v-if="errorMessagesUpdate.deliveryType" class="text-red-500">{{ errorMessagesUpdate.deliveryType }}</li>
          <li v-if="errorMessagesUpdate.price" class="text-red-500">{{ errorMessagesUpdate.price }}</li>
        </ul>
        <button @click="showModalUpdate = false" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
          Fermer
        </button>
      </div>
    </div>
  </div>
  </NuxtLayout>
    
</template>
