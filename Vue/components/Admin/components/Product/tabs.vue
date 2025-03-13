<script setup lang="ts">
import { ref } from 'vue';
import Description from "./Description.vue";
import AjoutImage from "./AjoutImage.vue";
import Specification from "./NewProduct/Specifications"
import { defineProps } from 'vue';
import {integer} from "vscode-languageserver-types";
import {JSONArray} from "superjson/dist/types";
import {MenubarArrow} from "radix-vue";


const props = defineProps<{ product: any }>();

const description = ref<string>('');
const main_specs = ref<string>('');
const specification = ref<JSONArray>();
const name = ref<string>('');
const model = ref<string>('');
const price = ref<integer>();
const stocks = ref<integer>();
const id = ref<integer>();
const width = ref<number>();
const height = ref<number>();
const weight = ref<number>();
const lenght = ref<number>();
const image = ref<string>('');
let varient_name = ref<string>('');
//*let localSpe = ref(props.specification_sheet)


description.value = props.product.description
main_specs.value = props.product.main_specs
name.value = props.product.name
price.value = props.product.price
id.value = props.product.id
image.value = props.product.image
stocks.value = props.product.stocks
model.value = props.product.model
width.value = props.product.width
height.value = props.product.height
weight.value = props.product.weight
lenght.value = props.product.lenght
varient_name.value = props.product.varient_name

//specification.value = JSON.parse(props.product.specification_sheet)
console.log(props.product);

const items = [
  {
    slot: 'description',
    label: 'Produit'
  },
  {
    slot: 'modif',
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
            <AjoutImage :image="image" />
          </div>
          <div class="w-2/3">
            <Description :description="description" :name="name" :price="price" :id="id" :stocks="stocks" :main_specs="main_specs" :model="model" :width="width" :height="height" :weight="weight" :length="length" :varient_name="varient_name" />
          </div>
        </div>
      </div>
    </template>

    <template #modif="{ item }">
      <UCard>
        <Specification :specification="specification" :id="id" />
      </UCard>
    </template>


  </UTabs>
</template>
