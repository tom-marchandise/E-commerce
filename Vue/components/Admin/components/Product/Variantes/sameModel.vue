<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useFetch } from '@vueuse/core'; // Assurez-vous que cette bibliothèque est correctement installée
import Card from '~/components/Admin/components/Cards/Card.vue';
import ModalStock from '~/components/Admin/components/ModalStock/ModalStock.vue';
import { useRouter } from 'vue-router'; // Assurez-vous que vue-router est installé et configuré

// Props
const props = defineProps<{ productId: string | null }>();

// State
const model = ref<string | null>(null);
const products = ref<any[]>([]);

// Fetch Data
const fetchData = async () => {
  try {
    if (props.productId) {
      const response = await fetch(`/api/AdminProduit/${props.productId}`);
      const prod = await response.json();
      model.value = prod[0]?.model || null;

      if (model.value) {
        const res = await fetch(`/api/AdminProduit/by-model/${model.value}`);
        products.value = await res.json();
      }
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

onMounted(() => {
  fetchData();
});

const router = useRouter();

function redirectToProduct(id: number) {
  router.push(`/admin/products/${id}`);
}
</script>

<template>
  <ul>
    <li
        v-for="product in products"
        :key="product.id"
        class="flex items-center gap-5 w-full px-5 py-3 lg:hover:bg-gray-100 lg:hover:cursor-pointer duration-100 border-t relative"
        @click="redirectToProduct(product.id)"
    >
      <img :src="JSON.parse(product.image)[0]" :alt="product.name" class="w-28" />
      <div class="flex flex-col">
        <span class="sm:text-lg font-semibold">{{ product.name }}</span>
        <span class="text-xs sm:text-base text-gray-500">{{ product.type }}</span>
        <div class="absolute right-4 bottom-3 gap-2 flex items-center">
        </div>
      </div>
    </li>
  </ul>
</template>


