<script setup lang="ts">
import Card from "~/components/Admin/components/Cards/Card.vue";

const orders = [
  {
    id: 1,
    total: 59.99,
    items: [
      { name: 'Produit A', quantity: 2, price: 15.00 },
      { name: 'Produit B', quantity: 1, price: 29.99 },
      { name: 'Produit B', quantity: 1, price: 29.99 }
    ]
  },
  {
    id: 2,
    total: 89.99,
    items: [
      { name: 'Produit C', quantity: 1, price: 89.99 },
      { name: 'Produit C', quantity: 1, price: 89.99 },
    ]
  },
  {
    id: 3,
    total: 129.99,
    items: [
      { name: 'Produit D', quantity: 3, price: 39.99 },
      { name: 'Produit D', quantity: 3, price: 39.99 },
    ]
  }
];

</script>

<template>

    <Card>
      <template #header>
        <h1 class="font-bold text-xl">Commandes</h1>
      </template>

      <template #content>
        <ul class="flex flex-col">
          <li v-for="order in orders" :key="order.id" class="flex flex-col w-full px-5 py-2.5 lg:hover:bg-gray-100 lg:hover:cursor-pointer duration-100 ">
            <div class="flex flex-col gap-2">
              <span class="text-lg font-semibold">Commande #{{ order.id }}</span>

              <ul class="flex flex-col gap-1 ">
                <li v-for="(article, index) in order.items.slice(0, 1)" :key="article.name" class="flex justify-between">
                  <span>{{ article.name }} (x{{ article.quantity }})</span>
                  <span>{{ article.price }} €</span>
                </li>
                <li v-if="order.items.length > 1" class="flex justify-between items-center">
                  <span class="text-gray-500">...</span>
                </li>
              </ul>
              <span class="text-md text-gray-500">Total: {{ order.total  }} €</span>
            </div>
          </li>
        </ul>
      </template>

      <template #footer>
        <div class="flex justify-between text-ms items-center px-1">
          <span class="text-gray-500 text-md">{{ orders.length }} commandes</span>
          <UButton class="text-lg bg-black text-white">Voir plus</UButton>
        </div>
      </template>
    </Card>
</template>

<style scoped>

</style>

