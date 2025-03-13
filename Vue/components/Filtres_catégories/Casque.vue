<script setup lang="ts">
const brands = ref([
  { value: 1, label: 'Dell' },
  { value: 2, label: 'HP' },
  { value: 3, label: 'Lenovo' },
  { value: 4, label: 'Acer' },
  { value: 5, label: 'Sennheiser' },
  { value: 6, label: 'Logitech' },
  { value: 7, label: 'Razer' },
  { value: 8, label: 'Corsair' },
  { value: 9, label: 'Samsung' },
  { value: 10, label: 'LG' },
  { value: 11, label: 'Bose' },
  { value: 12, label: 'Sony' },
  { value: 13, label: 'SteelSeries' },
  { value: 30, label: 'ASUS' },
  { value: 31, label: 'MSI' },
  { value: 36, label: 'G.Skill' },
]);

const wireless = ref([
  {value: true, label: 'Oui'},
  {value: false, label: 'Non'}
])

const lights = ref([
  {value: true, label: 'Oui'},
  {value: false, label: 'Non'}
])

const selected = ref(false)
</script>

<template>
  <div class="w-[80%] m-auto mt-7">
    <USelect placeholder="Marque" :options="brands" model-value=""/>
    <USelect placeholder="Sans-fil" :options="wireless" model-value="" class="mt-5"/>
    <USelect placeholder="Rétroéclairage" :options="lights" model-value="" class="my-5"/>
    <span class="font-bold">Prix</span>
    <div class="flex gap-4 mt-3">
    <UInput type="number" model-value="" placeholder="Entre" class="w-32" aria-valuemin="123"/>
    <UInput type="number" placeholder="Et" class="w-32" aria-valuemax="1600"/>
    </div>
    <UCheckbox v-model="selected" name="InStock" label="Produit en stock uniquement" class="my-7"/>
  </div>
</template>

<style scoped>

</style>