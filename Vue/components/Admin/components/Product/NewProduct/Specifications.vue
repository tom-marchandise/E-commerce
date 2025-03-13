<script setup lang="ts">
import {useFetch} from "@vueuse/core";
import { ref, onMounted } from 'vue';
import axios from "axios";
import {WatchKind} from "vscode-languageserver-protocol";
import Change = WatchKind.Change;


const items = ref<{ label: string; content: any }[]>([]);
const subitems = ref<{ label: string; content: any }[]>([]);
const url = window.location.pathname; // Ex: "/admin/products/50"
const productId = ref<string | null>(null);
const catId = ref<string | null>(null);
catId.value = localStorage.getItem('cat_id');
// Méthode pour extraire l'ID
const match = url.match(/\/admin\/products\/(\d+)/);
if (match && match[1]) {
  productId.value = match[1];
}
localStorage.setItem('productId', productId.value);

async function fetchSheetData() {
  console.log( 'id' ,productId);
  try {
    const { data } = await useFetch(`/api/AdminProduit/${productId.value}`).json();
    //au cas ou le sheet est vide mais on verra ca plus tard
    //if(!data){
      //const {data} = await useFetch(`/api/Categories/${catId.value}`).json();
      //console.log(catId)
      //console.log('ok' , data);
    //}
    return(JSON.parse(data.value[0].specification_sheet));
  } catch (err) {
    console.error('An error occurred:', err);
  }
}
const data = await fetchSheetData();

items.value = Object.keys(data).map((key) => {
  console.log(`Checking key: ${key}, value:`, data[key]);
  if (Array.isArray(data[key])) {
    console.log(`Checking key: ${key}, value:`, data[key]);
  } else {
    return {
      label: key,
      content: data[key]
    };
  }
});

const print_content = (object) => {
  const formattedObject: Record<string, any> = {};
  Object.keys(object).map(key => {
    if(typeof object[key] == "object" && object[key].length > 0){
      object[key].content = print_content(object[key]);
    }
    else{
      formattedObject[key] = ` ${object[key]}`
    }
  });
  return formattedObject
}


onMounted(() => {
  console.log('items' , items.value);
  console.log('data' , data);
});

// Fonction pour transformer les données
const transformData = (data) => {
  return data.reduce((acc, item) => {
    acc[item.label] = item.content;
    return acc;
  }, {});
};

const changeSheet = async () => {

  if (!productId.value) {
    console.error('Product ID is missing');
    return;
  }

  console.log('Product ID:', productId.value);
  console.log('Items:', JSON.stringify(items.value));

  const transformedData = transformData(items.value);

  console.log('Transformed Data:', JSON.stringify(transformedData));

  try {
    const response = await axios.put(
        `/api/AdminProduit/${productId.value}/specification`,
        {
          specification_sheet: transformedData,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
    );
    alert("Spécifications enregistrées")
    console.log('Response:', response.data);
  } catch (error) {
    console.error('Error updating specification sheet:', error);
  }
};

</script>

<template>
  <div class="flex items-center justify-center bg-gray-100 py-10 min-h-[70vh] rounded-lg">
    <div class="p-6 bg-white rounded-lg shadow-lg max-w-7xl w-full h-full">
      <UAccordion :items="items">
        <template #item="{ item }">
          <div class="mb-4">
            <ul class="space-y-2">
              <li v-for="(value, key) in item.content" :key="key" class="flex items-center">
                <strong class="w-1/3 text-gray-700">{{ key }}:</strong>
                <input v-model="item.content[key]" class="flex-1 border rounded px-3 py-2 ml-2" />
              </li>
            </ul>
          </div>
        </template>
      </UAccordion>
      <div class="mt-4 flex justify-end">
        <UButton :ui="{ rounded: 'rounded-full' }" @click="changeSheet" class="bg-green-500 text-white hover:bg-green-600">
          Terminer
        </UButton>
      </div>
    </div>
  </div>
</template>
