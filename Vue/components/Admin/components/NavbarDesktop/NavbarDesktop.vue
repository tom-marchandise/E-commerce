<script setup lang="ts">
import { useRoute } from 'vue-router';
import Link from "~/components/Admin/components/NavbarDesktop/Link/Link.vue";

import {
  CategorieSVG,
  CommandeSVG,
  CommentSVG,
  HomeSVG,
  ProductsSVG,
  PromotionSVG,
  ShippingCostSVG,
  StockSVG,
  UserSVG
} from "~/assets/admin/sidebar";

const navItems = [
  {
    to: '/admin',
    icon: HomeSVG,
    label: 'Accueil',
    activeColorClass: 'text-text-900 bg-transparent-10',
    inactiveColorClass: 'text-accent-300'
  },
  {
    to: '/admin/categories',
    icon: CategorieSVG,
    label: 'Catégories',
    activeColorClass: 'text-text-900 bg-transparent-10',
    inactiveColorClass: 'text-accent-300'
  },
  {
    to: '/admin/products',
    icon: ProductsSVG,
    label: 'Produits',
    activeColorClass: 'text-text-900 bg-transparent-10',
    inactiveColorClass: 'text-accent-300'
  },
  {
    to: '/admin/promotions',
    icon: PromotionSVG,
    label: 'Promotions',
    activeColorClass: 'text-text-900 bg-transparent-10',
    inactiveColorClass: 'text-accent-300'
  },
  {
    to: '/admin/stocks',
    icon: StockSVG,
    label: 'Stocks',
    activeColorClass: 'text-text-900 bg-transparent-10',
    inactiveColorClass: 'text-accent-300'
  },
  {
    to: '/admin/shipping-cost',
    icon: ShippingCostSVG,
    label: 'Frais de port',
    activeColorClass: 'text-text-900 bg-transparent-10',
    inactiveColorClass: 'text-accent-300'
  },
  {
    to: '/admin/orders',
    icon: CommandeSVG,
    label: 'Commandes',
    activeColorClass: 'text-text-900 bg-transparent-10',
    inactiveColorClass: 'text-accent-300'
  },
  {
    to: '/admin/users',
    icon: UserSVG,
    label: 'Utilisateurs',
    activeColorClass: 'text-text-900 bg-transparent-10',
    inactiveColorClass: 'text-accent-300'
  },

];
</script>

<template>
  <nav class="flex flex-col h-max lg:h-full rounded-full items-center xl:items-start lg:rounded-lg bg-transparent-10">
    <ul class="flex flex-col gap-9  lg:gap-5 py-5 lg:w-full">
      <Link v-for="item in navItems" :key="item.label" :activeColorClass="item.activeColorClass" :icon="item.icon" :to="item.to" :label="item.label" :inactive-color-class="item.inactiveColorClass"/>
    </ul>
  </nav>
</template>
