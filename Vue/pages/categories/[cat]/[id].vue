<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { TruckIcon, ShieldCheckIcon, LockClosedIcon, CheckBadgeIcon } from '@heroicons/vue/24/outline';
import { StarIcon, PencilSquareIcon, ShoppingCartIcon } from '@heroicons/vue/24/solid';
import {useFetch, useStorage} from '@vueuse/core';
import jwtDecode from 'jwt-decode';
import Toaster from '@/components/Toaster.vue';
import ky from "ky";


const encryptLocalStorage = useNuxtApp().$encryptLocalStorage;
const route = useRoute();
const id = parseInt(route.params.id as string);
const product = ref<any>(null);
const quantity = ref(1);
const currentSection = ref('fiche technique');
const selectedVariant = ref<any>(null);
const showImage = ref<string | null>(null);
const mainImage = ref<string>('')
const varients = ref([])
const email = ref('');
const isModalVisible = ref(false);
const toasterMessage = ref('');
const categoriesBreadcrumb = ref()
const breadcrumbLinks = ref([])



onMounted(async () => {

  try {
    const response = await fetch(`/api/Products/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Erreur fetch pour récupérer les produits:', errorData);
      return;
    }

    const productData = await response.json();
    productData.specification_sheet = JSON.parse(productData.specification_sheet || '{}');
    productData.orders_count = productData.orders ? productData.orders.length : 0;
    productData.reviews = productData.reviews || [];
    productData.imageList = productData.image ? productData.image.split(',') : [];
    mainImage.value = JSON.parse(productData.image)[0]
    product.value = productData;
    console.log(productData)

    const { data: varientsList, isFinished, isFetching } = await useFetch(`/api/Products/ByModelName/${productData.model}`).json();
    console.log(varientsList)
    varients.value = varientsList.value
    const responseCategory = await ky.get(`/api/Categories/Name/${productData.categoryName}`).json()
    categoriesBreadcrumb.value = responseCategory
    createBreadcrumb(responseCategory[0])
  } catch (error) {
    console.error('Erreur fetch produits:', error.message || error);
  }
});

// augmenter quantité
const increaseQuantity = () => {
  if (quantity.value < product.value.stocks) {
  quantity.value++;
  }
};

// diminuer quantité
const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--;
  }
};

const showSection = (section: string) => {
  currentSection.value = section;
};

// ajout produit panier
const addToCart = (isBuyNow) => {
  console.log(product.value)
  let cartItems = [];
  if (encryptLocalStorage.getItem('cart')) {
    cartItems = encryptLocalStorage.getItem('cart').length !== 0 ? encryptLocalStorage.getItem('cart') : [];
  }
  const existingProduct = cartItems.find((item: any) => item.id === product.value.id);
  if (existingProduct) {
    existingProduct.quantity += quantity.value;
  } else {
    cartItems.push({
      id: product.value.id,
      name: product.value.name,
      price: product.value.price,
      color: product.value.color,
      image: product.value.imageList,
      quantity: quantity.value,
      width: product.value.width,
      height: product.value.height,
      length: product.value.length,
      weight: product.value.weight,
      stocks: product.value.stocks
    });
  }
  encryptLocalStorage.setItem('cart', cartItems);

  toasterMessage.value = `L\'article ${product.value.name} a été ajouté au panier !`;

  if (isBuyNow) navigateTo('/panier/');
};

const selectVariant = (variant: any) => {
  selectedVariant.value = variant;
};

// fonction de styles
const formatVariantType = (type: string): string => {
  const minuscule = type.toLowerCase();
  const majuscule = minuscule.charAt(0).toUpperCase() + minuscule.slice(1);
  return majuscule;
};

const removeUnderscore = (name: string): string => {
  return name.replace(/_/g, ' ').replace(/(?:^|\s)\S/g, a => a.toUpperCase());
};

const showImageModal = (image: string) => {
  showImage.value = image;
};

const closeImageModal = () => {
  showImage.value = null;
};

const notifyWhenInStock = async () => {
  if (!email.value) {
    toasterMessage.value = 'Veuillez entrer votre adresse email.';
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email.value)) {
    toasterMessage.value = 'Format d\'adresse e-mail invalide.';
    return;
  }

  const productId = window.location.pathname.split('/').pop();

  try {
    const response = await fetch('/api/BackStock', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ Email: email.value, ProductId: productId }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      toasterMessage.value = errorData.errors?.Email[0] || 'Une erreur s\'est produite lors de l\'envoi de l\'email.';
      return;
    }

    const result = await response.json();
    toasterMessage.value = result.message || 'Vous serez notifié quand l\'article sera de nouveau en stock.';
    closeModal();
  } catch (error) {
    console.error('Erreur lors de la requête:', error.message || error);
    toasterMessage.value = 'Vous serez maintenant notifié quand l\'article sera de nouveau en stock !';
  }
};


const closeModal = () => {
  isModalVisible.value = false;
};

const openModal = () => {
  isModalVisible.value = true;
};


const createBreadcrumb = (category) => {
  const links = []

    const parent_navigation = category.category.parent_categoryNavigation
    console.log(parent_navigation)
    if (parent_navigation.length !== 0) {
      for (const [key, value] of Object.entries(parent_navigation)) {
        if (key === 'parent_categoryNavigation' && value.length !== 0) {
          for (const [k, v] of Object.entries(value)) {
            if (k === 'name') {
              console.log(v)
              links.unshift({label: v, to: `/categories/${v}/`})
            }
          }
        }
        if (key === 'name') {
          links.push({label: value, to: `/categories/${value}/`})
        }
      }
    }
    links.push({label: product.value.categoryName, to: `/categories/${product.value.categoryName}`})
    links.push({label: product.value.name})
    links.unshift({label: 'Accueil', to: '/'})
    console.log(links)
  breadcrumbLinks.value = links
}

</script>

<template>
  <div class="py-14 min-h-screen" v-if="product">
    <div class="pl-16">
      <UBreadcrumb :links="breadcrumbLinks" divider=">" class="justify-center text-lg"/>
    </div>
    <div class="flex justify-between space-x-5 p-5 mt-1">
      <div class="w-1/4 p-9 rounded-lg shadow-lg ml-5 relative flex flex-col justify-between items-center h-[500px] bg-transparent-10">
        <img
            v-if="product.imageList && product.imageList.length > 0"
            :src="mainImage"
            alt="Image Description"
            class="w-fit rounded-lg cursor-pointer"
            @click="showImageModal(mainImage)"
        />
        <div class="carousel-wrapper rounded-lg h-fit">
          <div class="carousel" id="carousel">
            <div
                v-for="(img, index) in JSON.parse(product.imageList)"
                :key="index"
                :class="mainImage !== img ? 'opacity-70' : ' '"
                class="carousel-thumbnail cursor-pointer"
            >
              <img
                  :src="img"
                  alt="Additional Image"
                  @click="showImageModal(img)"
                  class="border"
                  @mouseover="mainImage = img"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="w-2/3 p-4 rounded-lg shadow-xl h-[500px] overflow-y-auto bg-transparent-10 dark:text-white">
        <h1 class="font-bold text-3xl">{{ product.name }}</h1>
        <div class="flex items-center mt-1">
          <div class="flex space-x-1">
            <StarIcon
                v-for="index in 5"
                :key="index"
                :class="product.reviews.length > 0 && index <= 3 ? 'text-[#fe911d]' : 'text-[#d5ccc4]'"
                class="w-5 h-5"
            />
          </div>
        </div>
        <div class="flex items-center mt-2 space-x-2">
          <div class="flex items-center space-x-1">
            <div class="w-2 h-2 bg-gray-400 rounded-full"></div>
            <PencilSquareIcon class="w-3 h-3"/>
            <p class="text-xs">
              {{ product.reviews.length > 0 ? product.reviews.length + ' Avis' : 'Pas encore d\'avis' }}
            </p>
          </div>
          <div class="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
          <div class="flex items-center space-x-1">
            <ShoppingCartIcon class="w-3 h-3"/>
            <p class="text-xs">
              {{ product.orders_count > 0 ? product.orders_count + ' Commandes' : 'Pas encore de commande' }}
            </p>
          </div>
        </div>
        <p class="text-gray-900 mt-2.5 xl:text-md text-sm" v-if="product.main_specs">{{product.main_specs}}</p>
        <h1 class="mt-2.5 text-sm">{{ product.description }}</h1>

        <div class="flex gap-2 mt-8" v-if="varients.length > 1">
          <div v-for="varient in varients" class="mt-3">
            <NuxtLink :to="`/categories/${varient.category.name}/${varient.id}`" :class="varient.name === product.name ? 'bg-dominant-500 text-white py-3 px-5' : 'bg-transparent-10 text-text-900 py-3 px-5 hover:bg-gray-500'" class="p-2 rounded-xl">{{varient.varient_name}}</NuxtLink>
          </div>
        </div>
      </div>

      <div class="w-1/4 bg-pink-100 p-4 rounded-lg shadow-xl h-[500px] text-text-900 bg-opacity-45 border-pink-50 dark:bg-dominant-100">
        <div class="flex items-center justify-between font-medium font-bold text-lg">
          <span>{{ product.price }}€</span>
          <span :class="product.stocks > 10 ? 'text-green-500' : product.stocks === 0 ? 'text-red-500' : 'text-amber-500'">
            {{ product.stocks > 10 ? 'En stock' : product.stocks === 0 ? 'Hors stock' : 'Plus que ' + product.stocks }}
          </span>
        </div>
        <p class="opacity-70 mb-2 text-xs">TVA incluse</p>
        <div class="bg-white text-black rounded-3xl flex items-center justify-between p-2 w-24 h-7">
          <button @click="decreaseQuantity" class="px-2 py-1 text-lg font-bold opacity-30 hover:opacity-80 transition-opacity">-</button>
          <div class="h-6 w-px bg-gray-300"></div>
          <span class="px-3 text-lg font-bold">{{ quantity }}</span>
          <div class="h-6 w-px bg-gray-300"></div>
          <button @click="increaseQuantity" class="px-2 py-1 text-lg font-bold opacity-30 hover:opacity-80 transition-opacity">+</button>
        </div>

        <div class="mt-14 text-xs">
          <div class="flex items-center mb-5">
            <TruckIcon class="w-5 h-5 mr-2" />
            <p class="opacity-70">Expédition dans le monde entier</p>
          </div>
          <div class="flex items-center mb-5">
            <LockClosedIcon class="w-5 h-5 mr-2" />
            <p class="opacity-70">Paiement sécurisé</p>
          </div>
          <div class="flex items-center mb-5">
            <ShieldCheckIcon class="w-5 h-5 mr-2" />
            <p class="opacity-70">Satisfait ou remboursé</p>
          </div>
        </div>

        <button @click="addToCart(false)" :disabled="product.stocks === 0" :class="product.stocks === 0 && 'disabled:opacity-70 disabled:cursor-not-allowed'" class="w-full h-10 bg-black text-white rounded-xl py-1 mt-6 text-sm">
          Ajouter au panier
        </button>
        <Toaster :message="toasterMessage" type="success" />
        <button @click="addToCart(true)"   :disabled="product.stocks === 0" :class="product.stocks === 0 && 'disabled:opacity-70 disabled:cursor-not-allowed'" class="h-10 bg-white text-black border border-black rounded-xl py-1 mt-6 text-sm w-full">
            Acheter maintenant
          </button>
        <p v-if="product.stocks === 0"
           @click="openModal"
           class="opacity-70 mt-8 text-sm ml-2 cursor-pointer hover:opacity-100 underline">
          Me prévenir quand le produit est de retour en stock
        </p>
        <transition name="modal">
          <div v-if="isModalVisible" class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div class="bg-white p-8 rounded-lg text-center w-11/12 max-w-lg">
              <div class="flex items-center justify-center">
                <span class="bg-black absolute top-4 right-4 cursor-pointer text-2xl" @click="closeModal">&times;</span>
                <p class="text-black text-lg">Veuillez entrer votre adresse mail</p>
              </div>
              <p class="text-gray-500 text-xs mt-2 opacity-70">
                Nous vous enverrons un mail lorsque l'article sera de nouveau disponible !
              </p>
              <input
                  v-model="email"
                  type="email"
                  placeholder="Entrez votre email"
                  class="border p-2 rounded w-full mt-4 text-black"
                  required
              />
              <button @click="notifyWhenInStock"
                      class="w-full h-10 bg-[#333] text-white rounded-lg mt-5 font-medium hover:bg-black transition duration-300">
                Valider
              </button>
            </div>
          </div>
        </transition>

      </div>
    </div>

    <div v-if="showImage" class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" @click.self="closeImageModal">
      <img :src="showImage" class="max-w-full max-h-full" />
    </div>

    <div class="w-full p-5 mt-5 rounded-lg shadow-xl max-w-7xl mx-auto bg-transparent-10">
      <div class="flex justify-between border-b border-gray-300 pb-4">
        <button @click="showSection('avis')" class="text-lg font-semibold text-text-900" :class="{ 'border-b-2 border-text-900': currentSection === 'avis' }">Avis</button>
        <button @click="showSection('fiche technique')" class="text-lg font-semibold text-text-900" :class="{ 'border-b-2 border-text-900': currentSection === 'fiche technique' }">Fiche technique</button>
        <button @click="showSection('livraison')" class="text-lg font-semibold text-text-900" :class="{ 'border-b-2 border-text-900': currentSection === 'livraison' }">Livraison</button>
      </div>

      

      <div v-if="currentSection === 'avis'" class="mt-5 text-text-900">
        <div v-if="product.reviews.length > 0">
          <div v-for="review in product.reviews" :key="review.id" class="bg-white p-4 rounded-lg shadow-xl">
            <h3 class="font-semibold text-lg">{{ review.user_name }}</h3>
            <div class="flex items-center mt-1">
              <div class="flex space-x-1">
                <StarIcon
                    v-for="index in 5"
                    :key="index"
                    :class="index <= review.rating ? 'text-[#fe911d]' : 'text-[#d5ccc4]'"
                    class="w-5 h-5"
                />
              </div>
            </div>
            <p class="text-sm mt-2">{{ review.body }}</p>
            <p class="text-xs text-gray-500 mt-1">{{ new Date(review.created_at).toLocaleDateString() }}</p>
          </div>
        </div>
        <div v-else>
          <p>Aucun avis. Soyez le premier à en donner un.</p>
        </div>
      </div>



      <div v-if="currentSection === 'fiche technique'" class="mt-5 text-text-900">
        <div v-for="(value, key) in product.specification_sheet" :key="key" class="flex flex-col   justify-between mt-2"> 
          <h2 class="font-bold text-xl mt-4">{{ key.replace(/_/g, ' ').toUpperCase() }}</h2>
          <table class="min-w-full border border-gray-300 dark:border-black bg-transparent-10">
            <thead>
            <tr>
              <th class="px-4 py-2 border-b border-r w-1/2 border-gray-300 dark:border-black">Critère</th>
              <th class="px-4 py-2 border-b w-1/2 border-gray-300 dark:border-black">Description</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(value, key) in value" :key="key">
              <td class="px-4 py-2 border-b border-r w-1/2 border-gray-300 dark:border-black">{{ removeUnderscore(key) }}</td>
<!--              <td v-if="typeof value === 'object'" class="px-4 py-2 border-b border-r w-1/2">{{value.join(', ')}}</td>-->
              <td class="px-4 py-2 border-b w-1/2 border-gray-300 dark:border-black" v-if="typeof value !== 'object'">{{value}}</td>
              <td v-else-if="Array.isArray(value)" class="px-4 py-2 border-b border-gray-300 dark:border-black">{{value.join(', ')}}</td>
              <td v-else>
                <p v-for="(v, k) in value" class="px-4 py-2 border-b dark:border-black">{{removeUnderscore(k)}}: {{Array.isArray(v) ? v.join(', ') : v}}</p>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!--  section -->
      <div v-if="currentSection === 'livraison'" class="mt-5 text-text-900">
        <div class="flex items-center mb-4">
          <TruckIcon class="w-6 h-6 mr-2"/>
          <p>Expédition rapide dans le monde entier.</p>
        </div>
        <div class="flex items-center mb-4">
          <ShieldCheckIcon class="w-6 h-6 mr-2"/>
          <p>Garanties de sécurité et de satisfaction.</p>
        </div>
        <div class="flex items-center mb-4">
          <LockClosedIcon class="w-6 h-6 mr-2"/>
          <p>Paiement sécurisé avec les meilleures pratiques.</p>
        </div>
      </div>
    </div>

    <div class="w-full p-5 mt-5 rounded-lg shadow-xl max-w-7xl mx-auto overflow-x-auto bg-transparent-10">
      <h2 class="text-xl font-bold mb-4 text-center text-text-900">Vous pourriez aussi aimer</h2>
      <div class="flex overflow-x-auto gap-10">
        <!-- Card 1 -->
        <div class="flex-none w-60 bg-white p-4 rounded-lg shadow-lg">
          <img src="https://media.ldlc.com/r1600/ld/products/00/06/02/35/LD0006023574.jpg" alt="Product related img" class="w-full h-32 object-cover rounded-lg mb-2" />
          <h3 class="font-semibold text-lg">LDLC SPC-N-8-240-N</h3>
          <p class="text-gray-600"></p>
          <div class="mt-2 flex items-center justify-between">
            <span class="font-bold text-lg">189.95€</span>
            <button class="bg-black text-white py-1 px-3 rounded-lg text-sm">Voir</button>
          </div>
        </div>
        <div class="flex-none w-60 bg-white p-4 rounded-lg shadow-lg">
          <img src="https://media.ldlc.com/r1600/ld/products/00/06/05/99/LD0006059907_0006060436_0006060452.jpg" alt="Product related img" class="w-full h-32 object-cover rounded-lg mb-2" />
          <h3 class="font-semibold text-lg">Altyk L14F-I5U16-N1</h3>
          <p class="text-gray-600"></p>
          <div class="mt-2 flex items-center justify-between">
            <span class="font-bold text-lg">799.95€</span>
            <button class="bg-black text-white py-1 px-3 rounded-lg text-sm">Voir</button>
          </div>
        </div>
        <div class="flex-none w-60 bg-white p-4 rounded-lg shadow-lg">
          <img src="https://media.ldlc.com/r1600/ld/products/00/06/05/93/LD0006059307.jpg" alt="Product related img" class="w-full h-32 object-contain rounded-lg mb-2" />
          <h3 class="font-semibold text-lg">Zalman i3 Neo White</h3>
          <p class="text-gray-600"></p>
          <div class="mt-2 flex items-center justify-between">
            <span class="font-bold text-lg">62.95€</span>
            <button class="bg-black text-white py-1 px-3 rounded-lg text-sm">Voir</button>
          </div>
        </div>
        <div class="flex-none w-60 bg-white p-4 rounded-lg shadow-lg">
          <img src="https://media.ldlc.com/r1600/ld/products/00/06/08/48/LD0006084872.jpg" alt="Product related img" class="w-full h-32 object-cover rounded-lg mb-2" />
          <h3 class="font-semibold text-lg">Corsair iCUE H150 RGB</h3>
          <p class="text-gray-600"></p>
          <div class="mt-2 flex items-center justify-between">
            <span class="font-bold text-lg">159.95€</span>
            <button class="bg-black text-white py-1 px-3 rounded-lg text-sm">Voir</button>
          </div>
        </div>
        <div class="flex-none w-60 bg-white p-4 rounded-lg shadow-lg">
          <img src="https://media.ldlc.com/r1600/ld/products/00/05/43/30/LD0005433061_2.jpg" alt="Product related img" class="w-full h-32 object-cover rounded-lg mb-2" />
          <h3 class="
          font-semibold text-lg">Ducky Channel One 2</h3>
          <p class="text-gray-600"></p>
          <div class="mt-2 flex items-center justify-between">
            <span class="font-bold text-lg">109.95€</span>
            <button class="bg-black text-white py-1 px-3 rounded-lg text-sm">Voir</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="min-h-screen flex justify-center items-center">
    <h1 class="text-4xl font-bold">Chargement...</h1>
  </div>
</template>


<style scoped>
#carousel::-webkit-scrollbar {
  width: 12px;
}

#carousel::-webkit-scrollbar-thumb {
  background-color: gray;
  border-radius: 20px;
}

.carousel-wrapper {
  background-color: white;
  bottom: -30%;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
}

.carousel {
  display: flex;
  overflow-x: auto;
}

.carousel-thumbnail {
  flex: 0 0 auto;
  width: 25%;
  height: 25%;
}

.carousel-thumbnail img {
  width: fit-content;
  height: fit-content;
  object-fit: cover;
  border-radius: 5px;
}

hr {
  border: none;
  border-top: 1px solid white;
  opacity: 0.33;
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.fixed {
  position: fixed;
}

.inset-0 {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.bg-black {
  background-color: rgba(0, 0, 0, 0.75);
}

.max-w-full {
  max-width: 50%;
}

.max-h-full {
  max-height: 50%;
}

.z-50 {
  z-index: 50;
}

</style>