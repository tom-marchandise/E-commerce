<script setup lang="ts">
import ky from "ky";


const props = defineProps({
  product : {
    type: Object,
  }
})
const isOpen = ref(false)
const stock = ref(props.product.stocks)

const emit = defineEmits(["updateStock"]);

const getStockClass = (stock) => {
  if (stock >= 30) {
    return 'bg-emerald-500 hover:bg-emerald-600 text-white p-2 rounded';
  } else if (stock >= 10 && stock <= 29) {
    return 'bg-orange-500 hover:bg-orange-600 text-white p-2 rounded';
  } else {
    return 'bg-red-500 hover:bg-red-600 text-white p-2 rounded';
  }
};


const handleDecrementStock = () => {
  if(stock.value === 0) return;
  stock.value -= 1;
  console.log(stock.value)

}

const handleIncrementStock = () => {
  stock.value += 1;
  console.log(stock.value)
}

const onSubmit = async () => {
  console.log(stock.value);

  try {
    const response = await ky.patch(`/api/AdminProduit/${props.product.id}/stock`, {
      json: stock.value 
    });

    if (response.ok) {
      console.log(`Stock produis : ${props.product.id} mis à jour avec succès, ${stock.value}`);
      emit("updateStock", { id: props.product.id, stocks: stock.value });
      isOpen.value = false;
      
    } else {
      console.error('Erreur lors de la mise à jour du stock');
    }
  } catch (error) {
    console.error('Erreur lors de la requête PATCH:', error);
  }
};


</script>

<template>
    <span class="min-w-52 text-center text-black" :class="getStockClass(product.stocks)" @click.stop="isOpen = true">produit en stock : {{product.stocks}}</span>
    <UModal v-model="isOpen" class="">
      <form @submit.prevent="onSubmit" class="p-4 bg-white rounded shadow ">
        <div class="flex items-center space-x-4 text-black">
          <UButton @click="handleDecrementStock" label="-" class="px-4 py-2 bg-red-500 dark:bg-red-500 dark:text-white rounded hover:bg-red-600 dark:hover:bg-red-600"/>
          <span class="text-md ">Stock {{ stock }}</span>
          <UButton @click="handleIncrementStock" label="+" class="px-4 py-2 bg-orange-500 dark:bg-orange-500 dark:text-white hover:bg-orange-600  dark:hover:bg-orange-600"/>
          <UInput v-model="stock" type="number" min="0" class="text-black dark:text-black"/>
          <UButton type="submit" label="submit" class="px-4 py-2 bg-green-500  rounded hover:bg-green-600"/>
        </div>
      </form>
    </UModal>
</template>