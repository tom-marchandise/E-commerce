<script setup lang="ts">
import { ref } from 'vue';
import axios from "axios";
import {defineProps} from "vue";
const isOpen = ref(false)
const props = defineProps<{
  stocks : number;
  description: string;
  model:  string ;
  main_specs: string;
  name: string;
  price: string | number; 
  id: string | number; 
  width: string | number;
  height: string | number;
  weight: string | number;
  length: string | number;
  varient_name: string | number;
}>();

console.log(props.description);
let localDesc = ref(props.description)
let localName =ref(props.name)
let localPrice = ref(props.price)
let localStocks = ref(props.stocks)
let localModel = ref(props.model);
let localMSpecs = ref(props.main_specs)
let localWidth = ref(props.width)
let localHeight = ref(props.height)
let localWeight = ref(props.weight)
let localLenght = ref(props.length)
let localVarientName = ref(props.varient_name)
console.log(props);
const handleSubmit = async (key: string, value: string | ArrayBuffer | number | null) => {
  try {
    if ((key === 'price' || key === 'stocks' || key === 'width' || key === 'height' || key === 'weight' || key == 'lenght' ) && typeof value === 'string') {
      value = parseFloat(value);
    }
    const response = await axios.put(
        `/api/AdminProduit/${props.id}/specification`,
        {
          [key]: value,
        },
        {
          headers: {    
            'Content-Type': 'application/json',
          },
        }
    );
    console.log('Product description updated successfully:', response.data);
  } catch (error) {
    console.error('Erreur lors de la mise à jour du produit:', error);
    console.log(key , typeof value)
  }
}

</script>

<template>
  <div class="flex items-center justify-center bg-gray-100 py-10 h-[70vh] rounded-lg">
    <div class="p-6 bg-white h-[600px] w-[900px] overflow-y-auto pr-4">
      <!-- Nom Section -->
      <div class="flex items-center space-x-4 mb-4">
        <h3 class="text-lg font-semibold text-gray-800 w-1/3">Nom</h3>
        <div class="flex-1">
          <UTextarea
              :rows="1"
              placeholder="Enter name..."
              v-model="localName"
              class="border-gray-300 rounded-lg p-2 w-full"
          />
        </div>

        <UButton
            icon="i-heroicons-pencil-square"
            size="sm"
            color="green"
            square
            variant="solid"
            @click="handleSubmit('name', localName)"
            class="text-white bg-green-500 hover:bg-green-600"
        >
          Update
        </UButton>
      </div>

      <div class="flex items-center space-x-4 mb-4">
        <h3 class="text-lg font-semibold text-gray-800 w-1/3">Model</h3>
        <div class="flex-1">
          <UTextarea
              :rows="1"
              placeholder="Enter model..."
              v-model="localModel"
              class="border-gray-300 rounded-lg p-2 w-full"
          />
        </div>

        <UButton
            icon="i-heroicons-pencil-square"
            size="sm"
            color="green"
            square
            variant="solid"
            @click="handleSubmit('model', localModel)"
            class="text-white bg-green-500 hover:bg-green-600"
        >
          Update
        </UButton>
      </div>


      <div class="flex items-center space-x-4 mb-4">
        <h3 class="text-lg font-semibold text-gray-800 w-1/3">Nom de la variente</h3>
        <div class="flex-1">
          <UTextarea
              :rows="1"
              placeholder="Enter le nom de la varient si se produit en est une..."
              v-model="localVarientName"
              class="border-gray-300 rounded-lg p-2 w-full"
          />
        </div>

        <UButton
            icon="i-heroicons-pencil-square"
            size="sm"
            color="green"
            square
            variant="solid"
            @click="handleSubmit('varient_name', localVarientName)"
            class="text-white bg-green-500 hover:bg-green-600"
        >
          Update
        </UButton>
      </div>
      
      <!-- Description Section -->
      <div class="flex items-center space-x-4 mb-4">
        <h3 class="text-lg font-semibold text-gray-800 w-1/3">Description</h3>
        <div class="flex-1">
          <UTextarea
              autoresize
              :maxrows="5"
              placeholder="Enter description..."
              v-model="localDesc"
              class="border-gray-300 rounded-lg p-2 w-full"
          />
        </div>
        <UButton
            icon="i-heroicons-pencil-square"
            size="sm"
            color="green"
            square
            variant="solid"
            @click="handleSubmit('description', localDesc)"
            class="text-white bg-green-500 hover:bg-green-600"
        >
          Update
        </UButton>
      </div>

      <!-- Caractéristiques Section -->
      <div class="flex items-center space-x-4 mb-4">
        <h3 class="text-lg font-semibold text-gray-800 w-1/3">Caractèristiques</h3>
        <div class="flex-1">
          <UTextarea
              autoresize
              :maxrows="5"
              placeholder="Enter les caractèristiques..."
              v-model="localMSpecs"
              class="border-gray-300 rounded-lg p-2 w-full"
          />
        </div>
        <UButton
            icon="i-heroicons-pencil-square"
            size="sm"
            color="green"
            square
            variant="solid"
            @click="handleSubmit('main_specs', localMSpecs)"
            class="text-white bg-green-500 hover:bg-green-600"
        >
          Update
        </UButton>
      </div>

      <!-- Prix Section -->
      <div class="flex items-center space-x-4 mb-4">
        <h3 class="text-lg font-semibold text-gray-800 w-1/3">Prix</h3>
        <div class="flex-1">
          <UInput
              type="number"
              placeholder="Enter price..."
              v-model="localPrice"
              class="border-gray-300 rounded-lg p-2 w-full"
          />
        </div>
        <UButton
            icon="i-heroicons-pencil-square"
            size="sm"
            color="green"
            square
            variant="solid"
            @click="handleSubmit('price', localPrice)"
            class="text-white bg-green-500 hover:bg-green-600"
        >
          Update
        </UButton>
      </div>

      <!-- Stocks Section -->
      <div class="flex items-center space-x-4 mb-4">
        <h3 class="text-lg font-semibold text-gray-800 w-1/3">Stocks</h3>
        <div class="flex-1">
          <UInput
              type="number"
              placeholder="Enter stocks..."
              v-model="localStocks"
              class="border-gray-300 rounded-lg p-2 w-full"
          />
        </div>
        <UButton
            icon="i-heroicons-pencil-square"
            size="sm"
            color="green"
            square
            variant="solid"
            @click="handleSubmit('stocks', localStocks)"
            class="text-white bg-green-500 hover:bg-green-600"
        >
          Update
        </UButton>
      </div>

      <!-- Width Section -->
      <div class="flex items-center space-x-4 mb-4">
        <h3 class="text-lg font-semibold text-gray-800 w-1/3">Largeur du colis</h3>
        <div class="flex-1">
          <UInput
              type="number"
              placeholder="Enter la largeur..."
              v-model="localWidth"
              class="border-gray-300 rounded-lg p-2 w-full"
          />
        </div>
        <UButton
            icon="i-heroicons-pencil-square"
            size="sm"
            color="green"
            square
            variant="solid"
            @click="handleSubmit('width', localWidth)"
            class="text-white bg-green-500 hover:bg-green-600"
        >
          Update
        </UButton>
      </div>

      <!-- Height Section -->
      <div class="flex items-center space-x-4 mb-4">
        <h3 class="text-lg font-semibold text-gray-800 w-1/3">Hauteur du colis</h3>
        <div class="flex-1">
          <UInput
              type="number"
              placeholder="Enter la hauteur..."
              v-model="localHeight"
              class="border-gray-300 rounded-lg p-2 w-full"
          />
        </div>
        <UButton
            icon="i-heroicons-pencil-square"
            size="sm"
            color="green"
            square
            variant="solid"
            @click="handleSubmit('height', localHeight)"
            class="text-white bg-green-500 hover:bg-green-600"
        >
          Update
        </UButton>
      </div>

      <!-- Weight Section -->
      <div class="flex items-center space-x-4 mb-4">
        <h3 class="text-lg font-semibold text-gray-800 w-1/3">Poids du colis</h3>
        <div class="flex-1">
          <UInput
              type="number"
              placeholder="Enter le poids..."
              v-model="localWeight"
              class="border-gray-300 rounded-lg p-2 w-full"
          />
        </div>
        <UButton
            icon="i-heroicons-pencil-square"
            size="sm"
            color="green"
            square
            variant="solid"
            @click="handleSubmit('weight', localWeight)"
            class="text-white bg-green-500 hover:bg-green-600"
        >
          Update
        </UButton>
      </div>

      <!-- Length Section -->
      <div class="flex items-center space-x-4 mb-4">
        <h3 class="text-lg font-semibold text-gray-800 w-1/3">Longueur du colis</h3>
        <div class="flex-1">
          <UInput
              type="number"
              placeholder="Enter la longueur..."
              v-model="localLenght"
              class="border-gray-300 rounded-lg p-2 w-full"
          />
        </div>
        <UButton
            icon="i-heroicons-pencil-square"
            size="sm"
            color="green"
            square
            variant="solid"
            @click="handleSubmit('length', localLenght)"
            class="text-white bg-green-500 hover:bg-green-600"
        >
          Update
        </UButton>
      </div>

      <UButton block @click="navigateTo(`/admin/products/Variantes/${props.id}`)"> Variantes </UButton>
    </div>
  </div>
</template>
