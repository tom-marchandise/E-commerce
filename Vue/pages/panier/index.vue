<script setup lang="ts">
import { ref, onMounted } from 'vue';
import {navigateTo} from "nuxt/app";

const cartItems = ref<any[]>([]);
const encryptLocalStorage = useNuxtApp().$encryptLocalStorage;

onMounted(() => {
  const savedCart = encryptLocalStorage.getItem('cart');
  if (savedCart) {
    cartItems.value = savedCart;
    console.log(cartItems)
  }
});
const removeItem = (id: number) => {
  cartItems.value = cartItems.value.filter(item => item.id !== id);
  encryptLocalStorage.setItem('cart', JSON.stringify(cartItems.value));
};

const decreaseQuantity = (quantity: number, id: number) => {
  if (quantity > 1) {
    console.log(cartItems.value)
    quantity--
    cartItems.value.forEach(item => {
      if (item.id === id) {
        item.quantity = quantity
      }
    })
    encryptLocalStorage.setItem('cart', JSON.stringify(cartItems.value));
  }
}

const increaseQuantity = (quantity: number, id: number, stocks) => {
  console.log(stocks)
  if (quantity < stocks) {
    quantity++
    cartItems.value.forEach(item => {
      if (item.id === id) {
        item.quantity = quantity
      }
    })
    encryptLocalStorage.setItem('cart', JSON.stringify(cartItems.value));
  }
}

const redirect = () => {
  const token = localStorage.getItem('jwt')
  if (token) {
    navigateTo('/panier/commande/informations')
  } else {
    navigateTo('/panier/creerCompte')
  }
}
</script>

<template>
  <div class="py-14 mt-16 bg-background-50 min-h-screen">
    <div class="flex flex-col p-5 mt-1">
      <div class="flex space-x-5">
        <div class="flex-1 bg-transparent-10 text-text-900 rounded-lg shadow-lg p-5">
          <h2 class="text-3xl font-semibold mb-4 text-dominant-500">Mon panier</h2>
          <div v-if="cartItems.length === 0">
            <p>Votre panier est vide.</p>
          </div>
          <div v-else>
            <ul class="divide-y divide-transparent">
              <li v-for="item in cartItems" :key="item.id" class="flex items-start py-4">
                <router-link :to="`/categories/${item.category}/${item.id}`" class="flex items-center">
                  <img
                      :src="JSON.parse(item.image)[0]"
                      alt="Product Image"
                      class="w-16 h-16 object-cover rounded-lg mr-4"
                  />
                </router-link>
                <div class="flex-1">
                  <div class="flex justify-between items-center mb-1">
                    <span class="text-lg font-medium">{{ item.name }}</span>
                    <span class="text-lg font-bold">{{ Math.round((item.price.toFixed(2) * item.quantity) * 100) / 100 }} €</span>
                  </div>

                  <div class="bg-white text-black rounded-3xl flex items-center justify-between p-2 w-32 h-8">
                    <button
                        @click="decreaseQuantity(item.quantity, item.id)"
                        class="px-2 py-1 text-lg font-bold opacity-30 hover:opacity-80 transition-opacity">
                      -
                    </button>
                    <span class="px-3 text-lg font-bold">{{ item.quantity }}</span>
                    <button
                        @click="increaseQuantity(item.quantity, item.id, item.stocks)"
                        class="px-2 py-1 text-lg font-bold opacity-30 hover:opacity-80 transition-opacity">
                      +
                    </button>
                  </div>


                  <button @click="removeItem(item.id)" class="mt-4 text-red-500 hover:text-red-700 font-semibold">
                    Supprimer
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div class="w-1/3 bg-transparent-10 text-text-900 rounded-lg shadow-lg p-5 flex flex-col">
          <div class="flex flex-col space-y-4 mb-4 flex-grow">
            <div class="flex justify-between text-lg mb-1">
              <span>Total du panier HT</span>
              <span class="font-bold">
                {{ Math.round((cartItems.reduce((total, item) => total + (item.quantity * item.price), 0).toFixed(2) * 0.80) * 100) / 100 }} €
              </span>
            </div>
            <div class="flex justify-between mb-1">
              <span>Prix de la TVA (20%)</span>
              <span class="font-bold">
                {{ Math.round((cartItems.reduce((total, item) => total + (item.quantity * item.price), 0).toFixed(2) * 0.20) * 100) / 100}} €
              </span>
            </div>

            <hr class="border-gray-700 mb-4" />

            <div class="flex justify-between text-xl font-bold mb-4 text-accent-400">
              <span>Total TTC</span>
              <span>
                {{ Math.round((cartItems.reduce((total, item) => total + (item.quantity * item.price), 0).toFixed(2)) * 100) / 100 }} €
              </span>
            </div>
          </div>

          <div class="flex justify-center px-4 py-2">
            <button @click="redirect" class="bg-dominant-500 text-white px-20 py-2 rounded-xl font-semibold">
              Commander
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
