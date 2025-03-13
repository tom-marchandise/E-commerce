<script setup lang="ts">
import NavbarDesktop from "~/components/Admin/components/NavbarDesktop/NavbarDesktop.vue";
import PromotionsCard from "~/components/Admin/components/Cards/PromotionsCard.vue";
import NavbarMobile from "~/components/Admin/components/NavbarMobile/NavbarMobile.vue";
import ListUser from "~/components/Admin/components/Cards/ListUser.vue";
import { StripeElementCard } from '@vue-stripe/vue-stripe';


</script>

<template>
  <div class="p-3 flex flex-col gap-5 bg-gray-100 h-screen lg:h-[calc(100vh_-_5rem)] lg:grid grid-cols-[18rem_1fr] dark:bg-black" >
    <NavbarDesktop/>
    <ListUser class="flex flex-col overflow-hidden"/>
    <NavbarMobile/>
  </div>
</template>
