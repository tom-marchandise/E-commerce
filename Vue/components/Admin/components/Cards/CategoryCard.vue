<script setup lang="ts">

import Card from "~/components/Admin/components/Cards/Card.vue";
import ky from "ky";
import {useFetch} from "@vueuse/core";
import ModalStock from "~/components/Admin/components/ModalStock/ModalStock.vue";
import {Cat} from "lucide-vue-next";
import {TYPE} from "undici/lib/llhttp/constants";
const props = defineProps({
  categories : {
    type : []
  },
  isFinished : {
    type : Boolean
  }
})

const {data : categories, isFinished} = useFetch("/api/AdminCategory").json();
const emit = defineEmits(["deleteCategory"]);


const handleDeleteCategory = async (category : any) => {
  try {
    const id = category.id;
    console.log(id)
    ky.delete(`/api/AdminCategory/${id}`);
    emit("deleteCategory", id);
  } catch (e) {
    console.log(e)
  }
 
  
}

async function redirectToCategory (id: number) {
  navigateTo(`/admin/categories/${id}`)
}

const getAllSubCategories = (parentId : number) => {
  const subCategories = categories.value?.filter(category => category.parent_category === parentId);
  console.log(subCategories);
}

watch(isFinished, () => {
  if(isFinished.value) {
    categories.value.map(category => {
      if(!category.image) return
      console.log(typeof category.image);
    })
    
    getAllSubCategories(1)
  }
})
</script>
<template>
  <Card class="flex flex-col h-[calc(100vh_-_7rem)] bg-transparent-10 rounded-xl p-5">
    <template #header>
      <div class="flex items-center py-2">
        <h2 class="font-bold text-2xl text-dominant-500 min-w-fit">Liste des catégories</h2>
        <div class="w-full flex justify-end">
          <NuxtLink to="/admin/categories/add" class="w-fit p-4 rounded-xl bg-dominant-500 dark:bg-accent-500 text-text-50 font-semibold hover:shadow-dominant-400 dark:hover:shadow-accent-400 duration-200 hover:shadow-[0_0px_20px_0px]">
            Ajouter une catégories
          </NuxtLink>
        </div>
      </div>
    </template>

    <template #content>
      <ul class="flex flex-col flex flex-col gap-3 overflow-y-scroll rounded-xl scrollbar-hide" v-if="isFinished">
        <li v-for="category in categories" :key="category.id">
          <NuxtLink to="/admin/categories/{{category.id}}" class="p-4 flex items-center gap-3 bg-transparent-10 hover:bg-secondary-200 rounded-xl relative">  
          <img :src="category.image" :alt="category.name" class="w-36">
          <div class="flex flex-col">
            <span class="sm:text-lg font-semibold text-text-900" >{{ category.name }}</span>
          </div>
            <div class="absolute right-4 bottom-3 gap-2 flex items-center">
              <span class="bg-red-500 p-2 rounded lg:inline-block text-white lg:text-base" @click.stop="() => handleDeleteCategory(category)">Supprimer</span>
            </div>
          </NuxtLink>
        </li>
      </ul>
    </template>
  </Card>
</template>
