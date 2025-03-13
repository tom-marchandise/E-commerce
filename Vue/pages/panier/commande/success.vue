<script setup lang="ts">
import {onBeforeMount, onMounted, ref} from "vue";
import ThankYouSVG from "~/assets/paiement/ThankYouSVG.vue";
import {navigateTo} from "nuxt/app";
import ky from "ky";
import jwtDecode from "jwt-decode";

const products = ref(null)
const isSendingData = ref(true)

onBeforeMount(() => {
  if (!encryptLocalStorage.getItem('cart') || encryptLocalStorage.getItem('cart').length === 0) return navigateTo('/');
  else if (!localStorage.getItem('jwt') && !encryptSessionStorage.getItem('email')) return navigateTo('/panier/creerCompte');
  else if (!encryptSessionStorage.getItem('address') || !encryptSessionStorage.getItem('delivery') || !encryptSessionStorage.getItem('deliveryCost') || !encryptSessionStorage.getItem('deliveryData') ||
    !encryptSessionStorage.getItem('commandTotal')) return navigateTo('/panier/commande/informations');
})

const encryptLocalStorage = useNuxtApp().$encryptLocalStorage
const encryptSessionStorage = useNuxtApp().$encryptSessionStorage;

onMounted(async () => {
  const deliveryData = await encryptSessionStorage.getItem('deliveryData')
  const address = await encryptSessionStorage.getItem('address')
  const deliveryCost = await encryptSessionStorage.getItem('deliveryCost')
  const deliveryType = await encryptSessionStorage.getItem('delivery')
  const commandTotal = await encryptSessionStorage.getItem('commandTotal')
  products.value = await encryptLocalStorage.getItem('cart')
  const deliveryId = deliveryCost.find(d => d.delivery_type === deliveryType).id
  const orderReference = generate(Date.now())
  
  const response = await ky.post('https://epicareer.epidoc.eu/api/package/send', {
    json: deliveryData,
  }).json()
  const orderId = response.id
  
  try {
    for (const product of products.value) {
      await ky.post('/api/OrdersInfo', {
        json: {
          order_reference: orderReference,
          user_id: localStorage.getItem('jwt') ? jwtDecode(localStorage.getItem('jwt')).id : null,
          product_id: product.id,
          status: "en cours",
          delivery_address: JSON.stringify(address),
          billing_address: JSON.stringify(address),
          quantity: product.quantity,
          taxes: 20,
          shipping_cost_id: deliveryId,
          total_amount: commandTotal,
          deliveryId: orderId
        }
      }).json()
      const response = await ky.post('/api/OrdersInfo/sendEmail', {
        json: {
          toEmail: localStorage.getItem('jwt') ? jwtDecode(localStorage.getItem('jwt')).email : encryptSessionStorage.getItem('email'),
          orderReference: orderReference
        }
      }).json()
      console.log(response)
    }
  } catch (error) {
    console.log(error)
  }
  encryptSessionStorage.removeItem('delivery')
  encryptSessionStorage.removeItem('deliveryCost')
  encryptSessionStorage.removeItem('address')
  encryptLocalStorage.removeItem('cart')
  encryptSessionStorage.removeItem('deliveryData')
  encryptSessionStorage.removeItem('commandTotal')
  if (encryptSessionStorage.getItem('email')) encryptSessionStorage.removeItem('email')
  isSendingData.value = false
})

  const generate = (date: Date): string => {
    let now = date
        ? new Date(date).getTime().toString()
        : Date.now().toString();

    if (now.length < 14) {
      const pad = 14 - now.length;
      now += randomNumber(pad);
    }
    return [now.slice(0, 4), now.slice(4, 10), now.slice(10, 14)].join('-');
  }

const randomNumber = (length: number): string => {
  return Math.floor(
      Math.pow(10, length - 1) +
      Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1) - 1)
  ).toString();
}




</script>

<template>
<div class="min-h-screen bg-background-50 flex justify-center pt-20">
  <div class="bg-transparent-10 p-4 flex flex-col items-center h-fit rounded-xl w-fit text-text-900 gap-3" v-if="!isSendingData">
    <ThankYouSVG size="400" />
    <h1 class="text-4xl font-semibold">Merci pour votre achat !</h1>
    <span class="text-xl">Votre paiement a bien été effectué.</span>
    <span class="text-xl">Un mail vous a été envoyé avec votre numéro de commande.</span>
    <span class="text-lg">Vous pouvez accéder à votre commande <NuxtLink to="/orders/list-orders" class="text-dominant-500">ici</NuxtLink>.</span>
    <div class="bg-background-50 p-5 shadow-inner rounded-lg" v-if="products">
      <div v-for="product in products" class="flex gap-4">
        <span>{{product.name}}</span>
        <span class="font-semibold text-accent-400">{{ Math.round((product.price.toFixed(2) * product.quantity) * 100) / 100 }} €</span>
      </div>
    </div>
  </div>
  <div v-else class="min-h-screen flex justify-center items-center">
    <h1 class="text-4xl text-text-50 font-bold">Envoie de votre commande...</h1>
  </div>
</div>
</template>

<style scoped>

</style>