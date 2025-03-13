<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { TruckIcon, ShieldCheckIcon, LockClosedIcon } from '@heroicons/vue/24/outline';

const props = defineProps({
  idProduit : {
    type: Number
  }
})
console.log("Composant : ", props.idProduit)
const products = ref([
  // Carte graphiques
  { id: 1, name: 'Carte graphique', description: 'Une puissante carte graphique NVIDIA pour les gamers.', price: '499.99€', stock: 'inStock', stockStatus: 'En stock', image: 'path/to/gpu-nvidia-image' },
  { id: 2, name: 'Carte graphique', description: 'Une carte graphique AMD pour des performances exceptionnelles.', price: '399.99€', stock: 'limited', stockStatus: 'Seulement 2 disponibles', image: 'path/to/gpu-amd-image' },
  { id: 3, name: 'Carte graphique', description: 'Une carte graphique GTX pour des graphismes impressionnants.', price: '299.99€', stock: 'inStock', stockStatus: 'En stock', image: 'path/to/gpu-gtx-image' },
  { id: 4, name: 'Carte graphique', description: 'Une carte graphique RTX pour des jeux de nouvelle génération.', price: '699.99€', stock: 'outOfStock', stockStatus: 'Rupture de stock', image: 'path/to/gpu-rtx-image' },
  { id: 5, name: 'Carte graphique', description: 'Une carte graphique RX pour une expérience visuelle incroyable.', price: '599.99€', stock: 'inStock', stockStatus: 'En stock', image: 'path/to/gpu-rx-image' },

  // Ram
  { id: 6, name: 'Ram', description: 'Barrette de RAM 8GB DDR4 pour des performances fluides.', price: '49.99€', stock: 'inStock', stockStatus: 'En stock', image: 'path/to/ram-8gb-image' },
  { id: 7, name: 'Ram', description: 'Barrette de RAM 16GB DDR4 pour les gamers et les créateurs.', price: '89.99€', stock: 'limited', stockStatus: 'Seulement 3 disponibles', image: 'path/to/ram-16gb-image' },
  { id: 8, name: 'Ram', description: 'Barrette de RAM 32GB DDR4 pour une performance ultime.', price: '159.99€', stock: 'inStock', stockStatus: 'En stock', image: 'path/to/ram-32gb-image' },
  { id: 9, name: 'Ram', description: 'Barrette de RAM 8GB DDR3 pour les systèmes plus anciens.', price: '39.99€', stock: 'outOfStock', stockStatus: 'Rupture de stock', image: 'path/to/ram-8gb-ddr3-image' },
  { id: 10, name: 'Ram', description: 'Barrette de RAM 16GB DDR3 pour une mise à niveau abordable.', price: '79.99€', stock: 'inStock', stockStatus: 'En stock', image: 'path/to/ram-16gb-ddr3-image' },

  // Carte mère
  { id: 11, name: 'Carte mère', description: 'Carte mère ATX pour les PC de jeu et de bureau.', price: '129.99€', stock: 'inStock', stockStatus: 'En stock', image: 'path/to/motherboard-atx-image' },
  { id: 12, name: 'Carte mère', description: 'Carte mère Micro ATX pour les configurations compactes.', price: '99.99€', stock: 'limited', stockStatus: 'Seulement 2 disponibles', image: 'path/to/motherboard-micro-atx-image' },
  { id: 13, name: 'Carte mère', description: 'Carte mère Mini ITX pour les petits boîtiers.', price: '149.99€', stock: 'inStock', stockStatus: 'En stock', image: 'path/to/motherboard-mini-itx-image' },
  { id: 14, name: 'Carte mère', description: 'Carte mère B450 pour les processeurs AMD Ryzen.', price: '89.99€', stock: 'outOfStock', stockStatus: 'Rupture de stock', image: 'path/to/motherboard-b450-image' },
  { id: 15, name: 'Carte mère', description: 'Carte mère Z490 pour les processeurs Intel de 10ème génération.', price: '189.99€', stock: 'inStock', stockStatus: 'En stock', image: 'path/to/motherboard-z490-image' },

  // Stockage
  { id: 16, name: 'Stockage', description: 'SSD 500GB pour des temps de chargement rapides.', price: '59.99€', stock: 'inStock', stockStatus: 'En stock', image: 'path/to/ssd-500gb-image' },
  { id: 17, name: 'Stockage', description: 'SSD 1TB pour plus d\'espace de stockage.', price: '99.99€', stock: 'limited', stockStatus: 'Seulement 3 disponibles', image: 'path/to/ssd-1tb-image' },
  { id: 18, name: 'Stockage', description: 'HDD 2TB pour un stockage massif.', price: '69.99€', stock: 'inStock', stockStatus: 'En stock', image: 'path/to/hdd-2tb-image' },
  { id: 19, name: 'Stockage', description: 'HDD 1TB pour un stockage abordable.', price: '49.99€', stock: 'outOfStock', stockStatus: 'Rupture de stock', image: 'path/to/hdd-1tb-image' },
  { id: 20, name: 'Stockage', description: 'SSD 2TB pour les gros fichiers et les jeux.', price: '199.99€', stock: 'inStock', stockStatus: 'En stock', image: 'path/to/ssd-2tb-image' },

  // Connexions
  { id: 21, name: 'Connexions', description: 'Câble HDMI 2m pour une connexion fiable.', price: '9.99€', stock: 'inStock', stockStatus: 'En stock', image: 'path/to/hdmi-2m-image' },
  { id: 22, name: 'Connexions', description: 'Câble Ethernet 5m pour une connexion Internet rapide.', price: '14.99€', stock: 'limited', stockStatus: 'Seulement 1 disponible', image: 'path/to/ethernet-5m-image' },
  { id: 23, name: 'Connexions', description: 'Adaptateur USB-C pour plus de compatibilité.', price: '19.99€', stock: 'inStock', stockStatus: 'En stock', image: 'path/to/usb-c-adapter-image' },
  { id: 24, name: 'Connexions', description: 'Hub USB 3.0 pour connecter plusieurs appareils.', price: '29.99€', stock: 'outOfStock', stockStatus: 'Rupture de stock', image: 'path/to/usb-hub-image' },
  { id: 25, name: 'Connexions', description: 'Câble DisplayPort pour une haute résolution.', price: '12.99€', stock: 'inStock', stockStatus: 'En stock', image: 'path/to/displayport-cable-image' },

  // Refroidissement
  { id: 26, name: 'Refroidissement', description: 'Ventilateur 120mm pour un refroidissement efficace.', price: '19.99€', stock: 'inStock', stockStatus: 'En stock', image: 'path/to/fan-120mm-image' },
  { id: 27, name: 'Refroidissement', description: 'Refroidisseur liquide pour des performances optimales.', price: '99.99€', stock: 'limited', stockStatus: 'Seulement 2 disponibles', image: 'path/to/liquid-cooler-image' },
  { id: 28, name: 'Refroidissement', description: 'Pâte thermique pour une meilleure conductivité.', price: '7.99€', stock: 'inStock', stockStatus: 'En stock', image: 'path/to/thermal-paste-image' },
  { id: 29, name: 'Refroidissement', description: 'Refroidisseur CPU pour garder votre processeur au frais.', price: '49.99€', stock: 'outOfStock', stockStatus: 'Rupture de stock', image: 'path/to/cpu-cooler-image' },
  { id: 30, name: 'Refroidissement', description: 'Ventilateur RGB pour un look stylé et performant.', price: '24.99€', stock: 'inStock', stockStatus: 'En stock', image: 'path/to/rgb-fan-image' },
]);

const route = useRoute();
const id = parseInt(route.params.id as string);

const product = computed(() => products.value.find(p => p.id === id));

const quantity = ref(1);

const increaseQuantity = () => {
  quantity.value++;
};

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--;
  }
};
</script>

<template>
  <Navbar />
  <div v-if="product" class="flex justify-between space-x-5 p-5 mt-20">
    <div class="w-1/4 bg-white p-5 rounded-lg shadow-lg">
      <img :src="product.image" alt="Image Description" class="w-full rounded-lg" />
    </div>
    <div class="w-2/4 bg-white p-5 rounded-lg shadow-lg relative">
      <h1 class="absolute top-5 left-5 font-bold text-xl">{{ product.name }}</h1>
      <div class="mt-16 flex items-center justify-center">
        {{ product.description }}
      </div>
    </div>
    <div class="w-1/5 bg-[#171717] text-white p-5 rounded-lg shadow-lg">
      <div class="font-medium font-bold text-xl">{{ product.price }}</div>
      <p class="opacity-70 mb-3">TVA incluse</p>
      <div class="bg-white text-black rounded-3xl flex items-center justify-between p-2 w-1/2 h-12">
        <button @click="decreaseQuantity" class="px-2 py-1 text-xl font-bold opacity-30 hover:opacity-80 transition-opacity">-</button>
        <div class="h-6 w-px bg-gray-300"></div>
        <span class="px-3 text-lg font-bold">{{ quantity }}</span>
        <div class="h-6 w-px bg-gray-300"></div>
        <button @click="increaseQuantity" class="px-2 py-1 text-xl font-bold opacity-30 hover:opacity-80 transition-opacity">+</button>
      </div>

      <button class="w-full bg-black text-white rounded-3xl py-2 mt-10">
        Ajouter au panier
      </button>
      <button class="w-full bg-white text-black border border-black rounded-3xl py-2 mt-10">
        Acheter maintenant
      </button>

      <div class="opacity-40 text-[#FFFFFF]">
        <hr class="my-10 border-gray-300" />
        <div class="flex items-center mb-5">
          <TruckIcon class="w-6 h-6 mr-2" />
          <p class="text-sm">Expédition dans le monde entier</p>
        </div>
        <div class="flex items-center mb-5">
          <LockClosedIcon class="w-6 h-6 mr-2" />
          <p class="text-sm">Paiement sécurisé</p>
        </div>
        <div class="flex items-center">
          <ShieldCheckIcon class="w-6 h-6 mr-2" />
          <p class="text-sm">Satisfait ou remboursé</p>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <p>Produit non trouvé</p>
  </div>
</template>

<style scoped>
hr {
  border: none;
  border-top: 1px solid white;
  opacity: 0.33;
  margin-top: 2rem;
  margin-bottom: 2rem;
}
</style>
