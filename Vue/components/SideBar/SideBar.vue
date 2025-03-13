<script setup lang="ts">

import {ShoppingCartIcon} from "@heroicons/vue/24/outline";
import {ref} from "vue";
import LighDark from "~/components/Styles/LighDark.vue";

const props = defineProps({
  cart : {
    type : Object
  }
})
console.log(props.cart)
const encryptLocalStorage = useNuxtApp().$encryptLocalStorage;
const isSidebarVisible = ref(false);
const isSidebarHovering = ref(false);
const emit = defineEmits(['updateCart'])


const searchIn = ref([
  { value: 'name', label: 'Nom' },
  { value: 'category', label: 'Catégorie' }
]);


const updateQuantity = (index: number, quantity: number) => {
  if (quantity <= 0) {
    removeProduct(index);
  } else {
    if(!props.cart) return
    props.cart.value[index].quantity = quantity;
    saveCart();
  }
};

const removeProduct = (index: number) => {
  if(!props.cart) return
  props.cart.value.splice(index, 1);
  saveCart();
};

const saveCart = () => {
  if(!props.cart) return
  encryptLocalStorage.setItem('cart', JSON.stringify(props.cart.value));
  emit('updateCart', props.cart.value)
};

// calcule le nombre total d'articles dans le panier
const totalItemsInCart = computed(() => {
  if(!props.cart) return
  
  return props.cart.length && props.cart.value.reduce((total, item) => total + item.quantity, 0);
});

const totalPrice = () => {
  if(!props.cart) return
  let total = 0
  props.cart.value.forEach(product => {
    console.log(product)
    total = Math.round((product.price * product.quantity) * 100) / 100
  })
  return total
}

if (process.client && props.cart) {
  const storedCart = encryptLocalStorage.getItem('cart');
  if (storedCart) {
    try {
      props.cart.value = storedCart;
    } catch (error) {
      console.error('Erreur lors du parsing du panier depuis localStorage:', error);
    }
  }
}

// Watch pour réagir aux changements dans le panier
watch(props.cart, (newCart, oldCart) => {
  console.log('Panier mis à jour', newCart);
  // Par exemple, vous pouvez enregistrer le panier dans le localStorage
  localStorage.setItem('cart', JSON.stringify(newCart));
}, { deep: true }); // Utilisez deep: true pour surveiller les objets imbriqués

</script>

<template>
  <div class="relative" @mouseover="isSidebarHovering = true" @mouseleave="isSidebarHovering = false">
    <NuxtLink href="" class="hover:underline flex items-center">
      <ShoppingCartIcon class="h-6 w-6 hover:cursor-pointer" @click="isSidebarVisible = !isSidebarVisible" />
      <div v-if="totalItemsInCart > 0" class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-6 w-6 flex items-center justify-center text-xs p-1">
        {{ totalItemsInCart }}
      </div>
    </NuxtLink>
    <div v-if="isSidebarVisible" class="fixed inset-0 z-10 flex justify-end">
      <div class="relative w-96 max-w-md">
        <div class="absolute inset-0 flex justify-end">
          <div class="mt-20">
            <div class="flex h-96 flex-col overflow-y-scroll bg-white shadow-xl">
              <div class="flex items-start justify-between px-4 py-6">
                <h2 class="text-lg font-medium text-gray-900">Mon panier</h2>
                <button type="button" class="text-gray-400 hover:text-gray-500" @click="isSidebarVisible = false">
                  <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div class="overflow-y-auto px-4 py-6">
                <ul v-if="cart.length > 0" role="list" class="-my-6 divide-y divide-gray-200">
                  <li class="flex py-6" v-for="(item, index) in cart" :key="item.id">
                    <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img :src="JSON.parse(item.image)[0]" :alt="item.name" class="h-full w-full object-cover object-center" />
                    </div>
                    <div class="ml-4 flex flex-1 flex-col">
                      <div>
                        <div class="flex justify-between text-base font-medium text-gray-900">
                          <h3>{{ item.name }}</h3>
                        </div>
                        <p class="text-sm text-black font-semibold">{{ item.price }} €</p>
                        <div class="mt-1 flex items-center space-x-2 text-sm text-gray-500">
                          <span>Quantité:</span>
                          <input type="number" v-model.number="item.quantity" @change="updateQuantity(index, item.quantity)" class="w-12 text-center" />
                          <button @click="removeProduct(index)" class="text-red-500 hover:text-red-700">Supprimer</button>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
                <div v-else class="text-center text-gray-500">
                  <p>Votre panier est vide</p>
                </div>
              </div>
              <div v-if="cart.length > 0" class="flex justify-between items-center px-4 py-6">
              <span class="text-lg font-medium text-gray-900">
                Total: {{ totalPrice() }} €
              </span>
                <NuxtLink to="/panier" class="bg-black text-white px-4 py-2 rounded-md">Voir le panier</NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>