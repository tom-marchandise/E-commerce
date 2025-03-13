<script setup lang="ts">
import { ref, onMounted, computed, watchEffect, onBeforeMount, nextTick } from 'vue';
import jwtDecode from 'jwt-decode';
import { MagnifyingGlassIcon, ShoppingCartIcon, UserIcon } from '@heroicons/vue/24/outline';
import OptionUser from "~/components/Home/OptionUser.vue";
import ky from "ky";
import { navigateTo } from "nuxt/app";
import {useFetch} from "@vueuse/core";
import LighDark from "~/components/Styles/LighDark.vue";
import Logo from "~/assets/logo/Logo.vue";

const encryptLocalStorage = useNuxtApp().$encryptLocalStorage;
const firstName = ref<string | null>(null);
const isOptionUserOpen = ref(false);
const isSidebarVisible = ref(false);
const isSidebarHovering = ref(false);
const cart = ref<Array<{ id: number, name: string, image: string, price: number, quantity: number }>>([]);
const inputValue = ref('');
const isSuggestionVisible = ref(false);
const timer = ref<NodeJS.Timeout | null>(null);
const suggestionArray = ref<any[]>([]);
const searchIn = ref([
  { value: 'name', label: 'Nom' },
  { value: 'category', label: 'Catégorie' }
]);
const selectedCategory = ref('default');
const smallCategoryList = ref([])
const bigCategoryList = ref([])
const subCategoriesVisible = ref(false)

const {data: categories, isFinished, isFetching} = await useFetch('/api/Categories').json()
if (categories.value) {
  categories.value.forEach(category => {
    if (category.inverseparent_categoryNavigation.length === 0) {
      smallCategoryList.value.push({name: category.name, id: category.id})
    }
    if (!category['parent_category']) {
      bigCategoryList.value.push({name: category.name, childCategories: category.inverseparent_categoryNavigation})
    }
  })
}

onBeforeMount(() => {
  const token = localStorage.getItem('jwt');
  if (token) {
    try {
      const decodedToken: any = jwtDecode(token);
      firstName.value = decodedToken.given_name;
    } catch (error) {
      console.error('Erreur lors du décodage du token:', error);
    }
  }

  if (process.client) {
    const storedCart = encryptLocalStorage.getItem('cart');
    if (storedCart) {
      try {
        cart.value = storedCart;
        console.log(cart.value)
      } catch (error) {
        console.error('Erreur lors du parsing du panier depuis localStorage:', error);
      }
    }
  }
  
});

// calcule le nombre total d'articles dans le panier
const totalItemsInCart = computed(() => {
  return cart.value.reduce((total, item) => total + item.quantity, 0);
});

const handleDisconnectUser = () => {
  localStorage.removeItem('jwt');
  localStorage.removeItem('cart');
  firstName.value = null;
  cart.value = [];
  navigateTo('/');
};

const handleOpenOptionUser = () => {
  isOptionUserOpen.value = !isOptionUserOpen.value;
};

const removeProduct = (index: number) => {
  cart.value.splice(index, 1);
  saveCart();
};

const updateQuantity = (index: number, quantity: number) => {
  if (quantity <= 0) {
    removeProduct(index);
  } else {
    cart.value[index].quantity = quantity;
    saveCart();
  }
};

const saveCart = () => {
  encryptLocalStorage.setItem('cart', JSON.stringify(cart.value));
};

const totalPrice = () => {
  let total = 0
  console.log(cart.value)
  cart.value.forEach(product => {
    console.log(product)
    total = Math.round((product.price * product.quantity) * 100) / 100
  })
  return total
}

const handleOnChange = () => {
  clearTimeout(timer.value);
  timer.value = setTimeout(async () => {
    isSuggestionVisible.value = inputValue.value !== '';
    if (inputValue.value !== '') {
      try {
        const response = await ky.get(`/api/Products/${selectedCategory.value === 'default' ? 'Name' : `Category/Limited/${selectedCategory.value}/Name`}/${inputValue.value}`).json();
        suggestionArray.value = response.length ? response : 'Aucun résultat de recherche...';
      } catch (error) {
        console.error('Erreur lors de la recherche:', error);
        suggestionArray.value = 'Erreur de recherche...';
      }
    }
  }, 500);
};

const redirectToSuggestion = async (product) => {
  inputValue.value = '';
  isSuggestionVisible.value = false;
  await navigateTo(`/categories/${product.category.name}/${product.id}`);
};

const handleOnBlur = () => {
  nextTick(() => {
    setTimeout(() => {
      isSuggestionVisible.value = false;
    }, 50);
  });
};
</script>


<template>
    <nav class="select-none sticky top-0 w-full bg-pink-50 shadow-[0px_5px_13px_2px_#fdf2f8] dark:bg-dominant-100 dark:shadow-[0px_5px_13px_2px_#07212c] z-50 p-4 flex flex-col text-text-900 ">
      <div class="flex justify-between items-center">
      <div class="mb-2 w-10 h-10">
        <NuxtLink to="/">
            <Logo size="50" colorClass="text-dominant-500" class="group-hover:text-accent-500 logo"/>
        </NuxtLink>
      </div>
        <div>
          <h1 class="text-xl">Tech Yard</h1>
          <h2 class="">
            You're welcome <span class="font-bold">{{ firstName ? `${firstName}` : '' }}</span>  !
          </h2>
        </div>

        <div class="flex-grow flex justify-center relative">
        <select v-model="selectedCategory" class="rounded-xl bg-transparent-10 min-w-[19.5rem] text-text-900 text-opacity-70 px-4 py-2 mr-1.5 outline-0">
          <option value="default">Tout le site</option>
          <option v-for="category in smallCategoryList" :value="category.id">{{category.name}}</option>
        </select>
        <div class="relative w-full md:w-4/5 lg:w-2/3 xl:w-1/2">
          <input
              v-model="inputValue"
              type="text"
              placeholder="Rechercher un produit, une marque..."
              class="bg-transparent-10 placeholder-text-800 rounded-xl text-text-900 px-4 py-2 focus:outline-none pr-12 w-full"
              @input="handleOnChange"
          />
          <MagnifyingGlassIcon class="absolute right-4 top-0.5 transform translate-y-1/2 h-5 w-5" />
          <div v-if="isSuggestionVisible" class="bg-white dark:bg-black absolute w-full shadow border rounded-lg max-h-[33.5rem]">
            <div v-if="Array.isArray(suggestionArray)">
              <div v-for="suggestion in suggestionArray" class="border rounded-lg p-3 flex hover:bg-background-400 cursor-pointer" @click="redirectToSuggestion(suggestion)">
                <img :src="JSON.parse(suggestion.image)[0]" :alt="suggestion.name" class="w-20 rounded-lg mr-2" />
                <h2 class="flex items-center">{{ suggestion.name }}</h2>
              </div>
            </div>
            <div v-else class="p-3">
              <h2>{{ suggestionArray }}</h2>
            </div>
          </div>
        </div>
      </div>
      <div class="flex items-center space-x-4">
        <LighDark />

        <a href="/orders/list-orders" class="hover:underline border-r border-white border-opacity-20 pr-4 last:border-r-0 last:pr-0">Commandes</a>

        <div v-if="!firstName">
          <NuxtLink to="/auth/login" class="hover:underline border-r border-white border-opacity-20 pr-4 last:border-r-0 last:pr-0">Connexion</NuxtLink>
          </div>

        <div v-if="firstName" class="relative">
          <UserIcon class="h-6 w-6 hover:cursor-pointer" @click="handleOpenOptionUser" />
          <OptionUser :isOptionUserOpen="isOptionUserOpen" @disconnectUser="handleDisconnectUser" />
        </div>

        <div class="border-l border-white border-opacity-20 h-6 mx-2"></div>

        <!-- sidebar !-->
        <div class="relative" @mouseover="isSidebarHovering = true" @mouseleave="isSidebarHovering = false">
          <NuxtLink href="" class="hover:underline flex items-center">
            <ShoppingCartIcon class="h-6 w-6 hover:cursor-pointer" @click="isSidebarVisible = !isSidebarVisible" />
            <div v-if="totalItemsInCart > 0" class="absolute -top-2 -right-2 bg-red-500 rounded-full h-6 w-6 flex items-center justify-center text-xs p-1">
              {{ totalItemsInCart }}
            </div>
          </NuxtLink>
          <div v-if="isSidebarVisible" class="fixed inset-0 z-10 flex justify-end">
            <div class="relative w-96 max-w-md">
              <div class="absolute inset-0 flex justify-end">
                <div class="mt-20">
                  <div class="flex h-70 flex-col overflow-y-scroll bg-white shadow-xl">
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
                          <router-link :to="`/categories/${item.category}/${item.id}`" class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img :src="JSON.parse(item.image)[0]" :alt="item.name" class="h-full w-full object-cover object-center" />
                          </router-link>

                          <div class="ml-4 flex flex-1 flex-col">
                            <div>
                              <div class="flex justify-between text-base font-medium text-gray-900">
                                <h3>{{ item.name }}</h3>
                              </div>
                              <p class="text-sm text-black font-semibold">{{ item.price }} €</p>
                              <div class="mt-1 flex items-center space-x-2 text-sm text-gray-500">
                                <span>Quantité:</span>
                                <input type="number" v-model.number="item.quantity" @change="updateQuantity(index, item.quantity)" class="w-12 dark:bg-white border border-accent-500 text-center" />
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
                      <NuxtLink to="/panier" class="bg-black text-white px-4 py-2 rounded-md" @click="isSidebarVisible = false">Voir le panier</NuxtLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
<!--      <div class="flex justify-evenly mt-5">
        <UDropdown v-for="category in bigCategoryList" :items="category" mode="hover" class="text-white cursor-pointer">
          <span>{{category.name}}</span>
          <template #item="item">
            <span>{{item}}</span>
          </template>
          
        </UDropdown>
      </div>-->
    </nav>
</template>

<style scoped>
.logo {
  transition: transform 0.3s ease;
}

.logo:hover {
  transform: rotate(360deg);
}
</style>