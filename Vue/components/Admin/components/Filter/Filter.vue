<script setup lang="ts">
const brands = ref([
  { value: 'Dell', label: 'Dell' },
  { value: 'HP', label: 'HP' },
  { value: 'Lenovo', label: 'Lenovo' },
  { value: 'Acer', label: 'Acer' },
  { value: 'Sennheiser', label: 'Sennheiser' },
  { value: 'Logitech', label: 'Logitech' },
  { value: 'Razer', label: 'Razer' },
  { value: 'Corsair', label: 'Corsair' },
  { value: 'Samsung', label: 'Samsung' },
  { value: 'LG', label: 'LG' },
  { value: 'Bose', label: 'Bose' },
  { value: 'Sony', label: 'Sony' },
  { value: 'SteelSeries', label: 'SteelSeries' },
  { value: 'Microsoft', label: 'Microsoft' },
  { value: 'Arctic', label: 'Arctic' },
  { value: 'Noctua', label: 'Noctua' },
  { value: 'Thermal Grizzly', label: 'Thermal Grizzly' },
  { value: 'Cooler Master', label: 'Cooler Master' },
  { value: 'Be Quiet!', label: 'Be Quiet!' },
  { value: 'NZXT', label: 'NZXT' },
  { value: 'Seagate', label: 'Seagate' },
  { value: 'Western Digital', label: 'Western Digital' },
  { value: 'Toshiba', label: 'Toshiba' },
  { value: 'Crucial', label: 'Crucial' },
  { value: 'EVGA', label: 'EVGA' },
  { value: 'Seasonic', label: 'Seasonic' },
  { value: 'Fractal Design', label: 'Fractal Design' },
  { value: 'NVIDIA', label: 'NVIDIA' },
  { value: 'AMD', label: 'AMD' },
  { value: 'ASUS', label: 'ASUS' },
  { value: 'MSI', label: 'MSI' },
  { value: 'Gigabyte', label: 'Gigabyte' },
  { value: 'TP-Link', label: 'TP-Link' },
  { value: 'Netgear', label: 'Netgear' },
  { value: 'Intel', label: 'Intel' },
  { value: 'G.Skill', label: 'G.Skill' },
  { value: 'Kingston', label: 'Kingston' },
]);

const categories = ref([
  { value: 'PC_Portable', label: 'PC portable' },
  { value: 'Clavier', label: 'Clavier' },
  { value: 'Ecran', label: 'Ecran' },
  { value: 'Souris', label: 'Souris' },
  { value: 'Tapis', label: 'Tapis' },
  { value: 'Webcam', label: 'Webcam' },
  { value: 'Pate thermique', label: 'Pate thermique' },
  { value: 'Ventilateur', label: 'Ventilateur' },
  { value: 'Ventilateur_CPU', label: 'Ventirad' },
  { value: 'Water_cooling', label: 'Water cooling AIO' },
  { value: 'Disque_dur', label: 'Disque dur' },
  { value: 'SSD', label: 'SSD' },
  { value: 'Alimentation', label: 'Alimentation' },
  { value: 'Boitier', label: 'Boitier' },
  { value: 'Carte_Mere', label: 'Carte mère' },
  { value: 'CPU', label: 'Processeur' },
  { value: 'RAM', label: 'Mémoire (RAM)' },
]);

const selectedCategory = ref("");
const selectedBrand = ref("");

const handleSubmit = () => {
  console.log(selectedCategory.value)
  console.log(selectedBrand.value)

}

</script>

<template>
  <div class="flex flex-col p-6 gap-3" @submit.prevent="handleSubmit">
    <h2 class="font-bold text-xl">Filtre</h2>
    <form action="" class="flex flex-col gap-5" >
      <UInput
          icon="i-heroicons-magnifying-glass-20-solid"
          size="md"
          color="white"
          :trailing="false"
          placeholder="Chercher un produit"
      />

      <USelect
          placeholder="Categorie"
          :options="categories"
          v-model="selectedCategory"
      />

      <USelect
          placeholder="Marques"
          :options="brands"
          v-model="selectedBrand"
      />
      
      <div class="flex justify-end">
        <UButton type="submit" color="primary" variant="solid" class="w-fit">Appliquer</UButton>
      </div>
      <p>Selected Brand: {{ selectedBrand }}</p>
    </form>
  </div>
</template>
