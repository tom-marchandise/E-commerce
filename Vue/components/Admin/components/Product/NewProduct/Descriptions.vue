<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue';
import { useFetch } from '@vueuse/core';
import { z } from 'zod';
import {FormSubmitEvent} from "@nuxt/ui/dist/runtime/types";
import { useToast } from 'vue-toastification';
import {modal} from "@nuxt/ui/dist/runtime/ui.config";
import {greenBright} from "ansi-colors";
import Description from "~/components/Admin/components/Product/Description.vue";
import {variant} from "postcss-minify-font-values/types/lib/keywords";
const toast = useToast()

const state = reactive({
  name: '',
  model: '',
  brand_id: null,
  category_id: '',
  descriptions: null,
  main_specs: null,
  price: null,
  stocks: null,
  image: '',
  width: '',
  height: '',
  weight: '', 
  length: '',
  varient_name : ''
});
function clearForm() {
  state.name = '';
  state.model = '';
  state.brand_id = '';
  state.category_id = '' ;
  state.descriptions = '';
  state.main_specs = '';
  state.price = null;
  state.stocks = null;
  state.width = null;
  state.height = null;
  state.weight = null;
  state.length = null;
  state.varient_name = null;
}

const schema = z.object({
  price: z.number().nonnegative({ message: 'Entrez un prix valide' }),
  stocks: z.number().int().nonnegative({ message: 'Entrez un chiffre valide' }),
});

const brands = ref([]);
const categories = ref([]);
const brandsLoaded = ref(false);
const categoriesLoaded = ref(false);
const isOpen= ref(false);

async function fetchBrands() {
  const { data } = await useFetch("/api/AdminBrands/").json();
  brands.value = data.value;
  brandsLoaded.value = true;
}

async function fetchCategories() {
  const { data } = await useFetch("/api/AdminCategory/SubCategories").json();
  categories.value = data.value;
  categoriesLoaded.value = true;
}

const brandOptions = computed(() => {
  return brands.value.map(brand => ({
    label: brand.name,
    value: brand.id
  }));
});

const categoryOptions = computed(() => {
  return categories.value.map(category => ({
    label: category.name,
    value: category.id
  }));
});

const form = ref();
const productName = ref('');

async function onSubmit(event: FormSubmitEvent<any>) {
  const transformedData = {
    ...state,
    brand_id: state.brand_id.value,
    category_id: state.category_id.value,
  };

  const existingImagePath = localStorage.getItem('items');
  console.log(existingImagePath);

  if (existingImagePath) {
    transformedData.image = existingImagePath;
  }

  console.log(transformedData);
  console.log(JSON.stringify(transformedData));

  try {
    const response = await fetch('/api/AdminProduit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transformedData)
    });

    isOpen.value = true;

    localStorage.setItem('cat_id', JSON.stringify(transformedData.category_id));

    const data = await response.json();

    localStorage.setItem('product_id', data.id);

    console.log(data.id);

    productName.value = state.name;

    clearForm();

    navigateTo(`/admin/products/newSheet`);
  } catch (error) {
    console.error('Error:', error);
    console.log(JSON.stringify(transformedData))
  }
}

onMounted(() => {
  fetchBrands();
  fetchCategories();
});

</script>

<template>
  <div class="flex items-center justify-center bg-gray-100 py-10 h-[70vh] rounded-lg">
    <div class="p-6 bg-white h-[600px] w-[900px] overflow-y-auto pr-4">
    <UForm ref="form" :state="state" class="space-y-4" @submit="onSubmit" :schema="schema">
      <UFormGroup name="name" label="Nom du Produit">
        <UInput v-model="state.name" />
      </UFormGroup>

      <UFormGroup name="model" label="Model du Produit">
        <UInput v-model="state.model" />
      </UFormGroup>
      
      <UFormGroup name="varient_name" label="Nom de la variante">
        <UInput v-model="state.varient_name" />
      </UFormGroup>
      
      <template v-if="brandsLoaded">
        <UFormGroup name="brand_id" label="Marque">
          <UInputMenu v-model="state.brand_id" :options="brandOptions" />
        </UFormGroup>
      </template>

      <template v-if="categoriesLoaded">
        <UFormGroup name="category_id" label="Categorie">
          <UInputMenu v-model="state.category_id" :options="categoryOptions" />
        </UFormGroup>
      </template>

      <UFormGroup name="descriptions" label="Descriptions">
        <UTextarea v-model="state.descriptions" />
      </UFormGroup>

      <UFormGroup name="main_specs" label="Caractèristiques principales">
        <UTextarea v-model="state.main_specs" />
      </UFormGroup>

      <UFormGroup name="price" label="Prix" type="number">
        <UInput v-model="state.price" type="number" />
      </UFormGroup>

      <UFormGroup name="stocks" label="Stocks">
        <UInput v-model="state.stocks" type="number"/>
      </UFormGroup>

      <UFormGroup name="width" label="Largeur du colis">
        <UInput v-model="state.width" type="number"/>
      </UFormGroup>

      <UFormGroup name="height" label="Hauteur du colis">
        <UInput v-model="state.height" type="number"/>
      </UFormGroup>

      <UFormGroup name="weight" label="Poids du colis">
        <UInput v-model="state.weight" type="number"/>
      </UFormGroup>

      <UFormGroup name="length" label="Longueur du colis">
        <UInput v-model="state.length" type="number"/>
      </UFormGroup>

      <UButton type="submit">
        Ajouter
      </UButton>
    </UForm>
  </div>
  </div>
  <UModal v-model="isOpen">
    <UCard>
      <div class="space-y-2">
        <p>Produit Ajoutée :  <span class="text-green-700">{{ productName }}</span></p>
      </div>
    </UCard>
  </UModal>
</template>
