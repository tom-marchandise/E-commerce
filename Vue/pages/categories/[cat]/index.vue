<script setup lang="ts">
import {useFetch} from "@vueuse/core";
import CartesGraphiques from "~/components/Filtres_catégories/CartesGraphiques.vue";
import Casque from "~/components/Filtres_catégories/Casque.vue";
import ProductList from "~/components/pages_categories/ProductList.vue";

const cat = useRoute().params.cat


const { data : products, isFinished, isFetching } = await useFetch(`/api/Categories/Name/${cat}`).json()
console.log(products)

const redirection = (catName: String) => {
  navigateTo(`/categories/${catName}`)
}

const links = []

if (products.value && products.value[0].category.parent_categoryNavigation) {
  const parent_navigation = products.value[0].category.parent_categoryNavigation
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
  links.push({label: cat})
  links.unshift({label: 'Accueil', to: '/'})
  console.log(links)
} else {
  links.push({label: 'Accueil', to: '/'})
  links.push({label: cat})
}
</script>

<template>
<div v-if="products" class="flex flex-col">
  <div class="bg-[#F3F2F2] pt-12 pl-28">
    <UBreadcrumb :links="links" divider=">" class="justify-center text-lg"/>
  </div>
  <div v-if="products[0].category.inverseparent_categoryNavigation.length !== 0" class="p-4 dark:bg-black min-h-screen">
    <div class="bg-transparent-10 p-3 rounded-xl shadow sm:pb-10">
      <h1 class="text-2xl font-bold border-b border-[#D2D2D2] mt-3 mb-5 pb-4">{{cat}}</h1>
      <div class="flex flex-col gap-2 md:flex-wrap md:flex-row">
        <div v-for="product in products[0].category.inverseparent_categoryNavigation" class="bg-[#F3F3F3] dark:bg-black p-3 border border-dominant-500 dark:bg-transparent-10 flex rounded-lg cursor-pointer md:flex-col md:w-96 md:min-h-72 md:min-w-48" @click="redirection(product.name)">
          <img :src="product.image" alt="" class="w-20 bg-white rounded-xl md:w-44 md:flex md:mx-auto">
          <h3 class="flex items-center text-dominant-500 font-semibold justify-center mt-6 md:text-xl">{{product.name}}</h3>
          <div class="flex flex-wrap gap-3">
          <div v-if="product.inverseparent_categoryNavigation.length !== 0" v-for="category in product.inverseparent_categoryNavigation">
            <span class="text-sm dark:text-white hover:text-blue-600" @click="redirection(category.name)">{{category.name}}</span>
          </div>
            </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <ProductList :products="products[0].category.products" :filters="products[0].category.filters" :cat="cat"/>
  </div>
</div>
<!--<div v-else class="min-h-screen flex justify-center items-center border-red-500 border">
  <h2 class="text-7xl">Chargement...</h2>
</div>-->
</template>

<style scoped>

</style>