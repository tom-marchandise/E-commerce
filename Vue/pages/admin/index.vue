<script setup lang="ts">
import {definePageMeta} from "~/.nuxt/imports";

definePageMeta({
  layout: 'admin'
});

import {useFetch} from "@vueuse/core";
import UserCard from "~/components/Admin/components/Cards/UserCard/UserCard.vue";
import CategoryCard from "~/components/Admin/components/Cards/CategoryCard/CatgoryCard.vue";
import StockCard from "~/components/Admin/components/Cards/StockCard/StockCard.vue";
import PromotionCard from "~/components/Admin/components/Cards/PromotionCard/PromotionCard.vue";
import LineChart from "~/components/Admin/components/Charts/LineChart/LineChart.vue";
const {data , isFinished} = useFetch("/api/Admin/GetCount").json();
</script>

<template>
  <NuxtLayout>
    <div class="grid grid-cols-2 grid-rows-10 lg:grid-cols-4 gap-3 h-[calc(100vh_-_7rem)]">
      <UserCard :user="data.user" :userSince7days="data.userSince7days" v-if="isFinished && data" />
      <StockCard title="Produits en stock" to="/admin/stocks" number="48"/>
      <StockCard title="Frais de port" to="/admin/shipping-cost" number="20"/>
      <StockCard title="Utilisateurs" number="23"/>
      <CategoryCard :category="data.category" v-if="isFinished && data" />
      <PromotionCard/>
      <div class="flex flex-col col-start-1 col-end-3 lg:col-end-5 row-start-7 row-end-11 gap-4 bg-transparent-10 duration-150 hover:bg-secondary-50 dark:hover:bg-secondary-200 p-6 rounded-xl shadow-accent-300 ">
        <h2 class="text-xl font-semibold text-text-900">Nombre de visites cette semaine</h2>
        <LineChart/>
      </div>
    </div>
  </NuxtLayout>
</template>