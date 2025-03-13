<script setup lang="ts">
import { ref } from 'vue';
import Description from "./Descriptions.vue";
import AjoutImage from "./AjoutImage.vue";
import Specifications from "~/components/Admin/components/Product/NewProduct/Specifications.vue";

const items = [
  {
    slot: 'description',
    label: 'Produit'
  },
  {
    slot: 'spec',
    label: 'Spécifications'
  }
];
</script>

<template>
  <UTabs :items="items">
    <template #description="{ item }">
      <div class="flex justify-center items-center  py-10">
        <div class="flex w-full max-w-screen-2xl space-x-4">
          <div class="w-1/3">
            <AjoutImage/>
          </div>
          <div class="w-2/3">
            <Description/>
          </div>
        </div>
      </div>
    </template>
    <template #spec="{ item }">
      <UCard>
        <Specifications/>
      </UCard>
    </template>


  </UTabs>
</template>
