<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useFetch } from '@vueuse/core';
import { useRouter, useRoute } from 'vue-router';
import AddToCartSVG from "~/assets/products/AddToCartSVG.vue";
import Toaster from "~/components/Toaster.vue";

const categories = ref([]);
const selectedCategory = ref('');
const selectedSubCategory = ref('');
const subCategories = ref([]);
const products = ref([]);
const router = useRouter();
const route = useRoute();
const fullCategories = ref([]);
const toasterMessage = ref('');
const encryptLocalStorage = useNuxtApp().$encryptLocalStorage;


const fetchData = async () => {
  const { data: cat, isFinished } = await useFetch('/api/Categories').json();
  if (isFinished && cat.value) {
    fullCategories.value = cat.value;

    const ordinateursCategory = cat.value.find(c => c.name.toLowerCase() === "ordinateurs");
    const peripheriquesCategory = cat.value.find(c => c.name.toLowerCase() === "périphériques");

    if (ordinateursCategory || peripheriquesCategory) {
      const parentCategoryIds = [ordinateursCategory?.id, peripheriquesCategory?.id].filter(Boolean);

      categories.value = cat.value.filter(c => parentCategoryIds.includes(c.parent_category));

      const categoryFromRoute = route.params.category as string;
      if (categories.value.map(c => c.name).includes(categoryFromRoute)) {
        selectedCategory.value = categoryFromRoute;
        loadSubCategories(categoryFromRoute);
        const parentCategory = fullCategories.value.find(cat => cat.name === categoryFromRoute);
        const subCategoryList = fullCategories.value.filter(c => c.parent_category === parentCategory?.id);
        if (subCategoryList.length > 0) {
          selectedSubCategory.value = subCategoryList[0].name;
          fetchProductsForCategory(subCategoryList[0].name);
        } else {
          fetchProductsForCategory(categoryFromRoute);
        }
      } else if (categories.value.length > 0) {
        selectedCategory.value = categories.value[0].name;
        loadSubCategories(categories.value[0].name);
        const subCategoryList = fullCategories.value.filter(c => c.parent_category === categories.value[0].id);
        if (subCategoryList.length > 0) {
          selectedSubCategory.value = subCategoryList[0].name;
          fetchProductsForCategory(subCategoryList[0].name);
        } else {
          fetchProductsForCategory(categories.value[0].name);
        }
      }
    }
  }
};

const loadSubCategories = (categoryName: string) => {
  const category = fullCategories.value.find(c => c.name === categoryName);
  if (category) {
    subCategories.value = fullCategories.value.filter(c => c.parent_category === category.id) || [];
  } else {
    subCategories.value = [];
  }
};

const fetchProductsForCategory = async (categoryName: string) => {
  const category = fullCategories.value.find(c => c.name === categoryName);

  if (category) {
    const subCategoryNames = fullCategories.value
        .filter(c => c.parent_category === category.id)
        .map(c => c.name);

    if (subCategoryNames.length > 0) {
      const productsPromises = subCategoryNames.map(async (subCatName) => {
        const { data: subCatProducts, isFinished } = await useFetch(`/api/Products/Category/Top/${encodeURIComponent(subCatName)}`).json();
        return isFinished && subCatProducts.value ? subCatProducts.value : [];
      });

      const allSubCategoryProducts = await Promise.all(productsPromises);
      products.value = allSubCategoryProducts.flat().map(product => ({
        ...product,
        image: safeParseJSON(product.image)
      }));
      console.log(products.value)
    } else {
      const { data: categoryProducts, isFinished } = await useFetch(`/api/Products/Category/Top/${encodeURIComponent(categoryName)}`).json();
      if (isFinished && categoryProducts.value) {
        products.value = categoryProducts.value.map(product => ({
          ...product,
          image: safeParseJSON(product.image)
        }));
        console.log(products.value)
      } else {
        products.value = [];
      }
    }
  } else {
    products.value = [];
  }
};

const safeParseJSON = (jsonString: string) => {
  try {
    const parsed = JSON.parse(jsonString);
    return Array.isArray(parsed) ? parsed : [parsed];
  } catch {
    return [];
  }
};

onMounted(fetchData);

watch(selectedCategory, (newCategory) => {
  if (newCategory) {
    loadSubCategories(newCategory);
    if (subCategories.value.length > 0) {
      selectedSubCategory.value = subCategories.value[0].name;
      fetchProductsForCategory(subCategories.value[0].name);
    } else {
      products.value = [];
    }
  }
});

const selectCategory = (category: string) => {
  selectedCategory.value = category;
  selectedSubCategory.value = '';
  loadSubCategories(category);

  if (subCategories.value.length > 0) {
    selectedSubCategory.value = subCategories.value[0].name;
    fetchProductsForCategory(subCategories.value[0].name);
  } else {
    fetchProductsForCategory(category);
  }
};

const selectSubCategory = (subCategoryName: string) => {
  selectedSubCategory.value = subCategoryName;
  fetchProductsForCategory(subCategoryName);
};

const viewAll = () => {
  let path;
  if (selectedSubCategory.value) {
    path = encodeURIComponent(selectedSubCategory.value);
  } else if (selectedCategory.value) {
    path = encodeURIComponent(selectedCategory.value);
  }
  if (path) {
    router.push(`/categories/${path}`);
  }
};


const filteredProducts = computed(() => {
  if (selectedSubCategory.value === 'All') {
    return products.value.slice(0, 5);
  }
  const categoryProducts = products.value
      .filter(product => selectedSubCategory.value !== '' ? product.category.name === selectedSubCategory.value : product.category.name === selectedCategory.value)
      .slice(0, 5);
  return categoryProducts.length > 0
      ? categoryProducts
      : [{ id: 0, name: 'Pas de produits', description: '', price: '', image: [], stocks: 0 }];
});

const buttonClass = (category: string, isChild: boolean = false) => {
  const selected = isChild ? selectedSubCategory.value : selectedCategory.value;
  return category === selected
      ? 'border-b-2 border-dominant-500 text-dominant-500'
      : 'text-gray-500 decoration-accent-500';
};

const normaliseText = (text: string, maxLength: number) => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + '...';
  }
  return text;
};

const removeUnderscore = (name: string): string => {
  if (name && name.length > 0) {
    name = name[0].toUpperCase() + name.slice(1).toLowerCase();
    return name.replace(/_/g, ' ');
  }
  return '';
};

const addToCart = (product) => {
  console.log(product)
  let cartItems = [];
  let quantity = 1;
  if (encryptLocalStorage.getItem('cart')) {
    cartItems = encryptLocalStorage.getItem('cart').length !== 0 ? encryptLocalStorage.getItem('cart') : [];
  }
  const existingProduct = cartItems.find((item: any) => item.id === product.id);
  if (existingProduct) {
    existingProduct.quantity += quantity;
  } else {
    cartItems.push({
      id: product.id,
      name: product.name,
      price: product.price,
      color: product.color,
      image: JSON.stringify(product.image),
      quantity: quantity,
      width: product.width,
      height: product.height,
      length: product.length,
      weight: product.weight,
      stocks: product.stocks
    });
  }
  encryptLocalStorage.setItem('cart', cartItems);

  toasterMessage.value = `L\'article ${product.name} a été ajouté au panier !`;
};
</script>

<template>
  <div class="flex flex-col justify-center items-center px-6 py-8 bg-background-50">
    <div class="w-full max-w-7xl">
      <h2 class="text-2xl font-bold mb-4 dark:text-accent-400">Ordinateurs et périphériques</h2>

      <!-- Catégories principales -->
      <div class="flex justify-between mb-6">
        <div class="flex space-x-4">
          <button
              v-for="category in categories"
              :key="category.id"
              @click="selectCategory(category.name)"
              :class="buttonClass(category.name)"
          >
            {{ removeUnderscore(category.name) }}
          </button>
        </div>
        <button @click="viewAll" class="ml-auto text-xl font-bold text-accent-500 hover:underline">Voir tout →</button>
      </div>

      <!-- Sous-catégories -->
      <div v-if="subCategories.length > 0" class="flex space-x-4 mb-6">
        <button
            v-for="subCategory in subCategories"
            :key="subCategory.id"
            @click="selectSubCategory(subCategory.name)"
            :class="buttonClass(subCategory.name, true)"
        >
          {{ removeUnderscore(subCategory.name) }}
        </button>
      </div>

      <!-- Produits -->
      <div class="flex flex-wrap -mx-2">
        <div
            v-for="product in filteredProducts"
            :key="product.id"
            class="w-full sm:w-1/2 lg:w-1/3 xl:w-1/5 px-2 mb-4"
        >
          <div v-if="product.name !== 'Pas de produits'">
            <div @click="navigateTo(`/categories/${selectedSubCategory || selectCategory}/${product.id}`)"
                class="block cursor-pointer"
            >
              <div
                  class="rounded-lg shadow-md p-4 h-full flex flex-col justify-between bg-transparent-10"
                  style="min-height: 450px;"
              >
                <div class="flex justify-between items-start mb-2">
                  <span
                      :class="product.stocks > 10 ? 'text-green-500' : product.stocks === 0 ? 'text-red-500' : 'text-amber-500'"
                  >
                    {{
                      product.stocks > 10
                          ? 'En stock'
                          : product.stocks === 0
                              ? 'Hors stock'
                              : `Plus que ${product.stocks}`
                    }}
                  </span>
                </div>
                <NuxtImg
                    :src="product.image[0] || 'placeholder.jpg'"
                    :alt="product.name"
                    class="w-full h-32 object-contain mb-4 rounded-xl"
                />
                <h3 class="text-lg font-bold mb-1">{{ normaliseText(product.name, 30) }}</h3>
                <p class="text-gray-500 mb-2">{{ normaliseText(product.description, 125) }}</p>
                <div class="flex items-center justify-between w-full">
                  <p class="mt-auto text-lg font-semibold">{{ product.price }}€</p>
                  <AddToCartSVG size="28" color-class="text-black" @click.stop="addToCart(product)"/>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <div
                class="bg-transparent-10 rounded-lg shadow-md p-4 h-full flex flex-col justify-center items-center"
                style="min-height: 350px;"
            >
              <h3 class="text-lg font-bold mb-1">{{ product.name }}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Toaster :message="toasterMessage" type="success" />
</template>


<style scoped>
</style>
