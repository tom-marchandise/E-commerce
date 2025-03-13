<script setup lang="ts">
import {computed, defineProps, onMounted, ref} from 'vue';
import axios from 'axios';
import {useRoute} from 'vue-router';

const route = useRoute();
const productId = route.params.product_id as string;
const items = ref<string[]>([]);
const currentURL = ref<string[]>([]);
const props = defineProps<{
  image: string;
}>();

const uploadedImage = ref<File | null>(null);
const imagePreview = computed(() => {
  if (uploadedImage.value) {
    const objectURL = URL.createObjectURL(uploadedImage.value);
    items.value.push(objectURL);
    return objectURL;
  }
  return  null;
});

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files ? target.files[0] : null;

  if (file) {
    uploadedImage.value = file;
  }

  console.log('imgpreview' , imagePreview.value);
  console.log('upl' , uploadedImage.value);

  handleSubmit()
};

const handleDel = async (delURL) =>{
  items.value = items.value.filter(item => item !== delURL);
  return await axios.put(
      `/api/AdminProduit/${productId}/specification`,
      {
        image: JSON.stringify(items.value),
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      });
}

const handleSubmit = async () => {
  if (!uploadedImage.value) {
    alert('Veuillez sélectionner une image avant de soumettre.');
    return;
  }

  try {
    console.log('items', items.value);

    for (const item of items.value) {
      if (item.startsWith("blob")) {
        const formData = new FormData();
        formData.append('file', uploadedImage.value);

        const uploadResponse = await axios.post(
            `/api/Upload/upload`,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            }
        );

        console.log("test", item);
        items.value.push(uploadResponse.data.filePath);
      }
    }

    items.value = items.value.filter(item => !item.startsWith("blob:"));
    localStorage.setItem('items', JSON.stringify(items.value));
  } catch (error) {
    console.error('Erreur lors de la soumission:', error);
  }
};

onMounted(async () => {
  try {
    console.log('items', items.value);
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'image:', error);
  }
});

</script>

<template>
  <div class="flex items-center justify-center bg-gray-100 py-10 h-[70vh] rounded-lg">
    <div class="p-4 bg-white rounded-lg shadow-lg w-full max-w-md">
      <UCarousel
          :items="items"
          :ui="{
      item: 'basis-full',
      container: 'rounded-lg',
      indicators: {
        wrapper: 'relative bottom-0 mt-4'
      }
    }"
          indicators
          class="w-64 mx-auto"
      >
        <template #default="{ item }">
          <img :src="item" class="w-full" draggable="false">
        </template>

        <template #indicator="{ onClick, page, active }">
          <UButton :label="String(page)" :variant="active ? 'solid' : 'outline'" size="2xs" class="rounded-full min-w-6 justify-center"   @click="() => { onClick(page); currentURL.value = page - 1;}"/>
        </template>
      </UCarousel>
      <UButton @click="() => { 
       handleDel(items[currentURL.value]);        console.log('del', currentURL.value > 0 ? currentURL.value = currentURL.value - 1 : 0  ); 
         }">
        Supprimer l'image
      </UButton>
      <label class="block w-full mt-4 p-2 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 text-center">
        <span class="text-gray-600 font-bold">Choisir une image</span>
        <input
            type="file"
            accept="image/*"
            @change="handleFileUpload"
            class="hidden"
        />
      </label>
    </div>
  </div>
</template>
