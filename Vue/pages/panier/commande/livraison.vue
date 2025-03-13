<script setup lang="ts">
import {onMounted, ref, defineAsyncComponent, onBeforeMount} from "vue";
import ky from "ky";
import PaypalSVG from "~/assets/paiement/PaypalSVG.vue";
import {loadStripe} from '@stripe/stripe-js';
import IsLoadingSVG from "~/assets/paiement/IsLoadingSVG.vue";
import {navigateTo, useRuntimeConfig, useNuxtApp} from "nuxt/app";
import {use} from "h3";

onBeforeMount(() => {
  if (!encryptLocalStorage.getItem('cart') || encryptLocalStorage.getItem('cart').length === 0) return navigateTo('/');
  else if (!localStorage.getItem('jwt') && !encryptSessionStorage.getItem('email')) return navigateTo('/panier/creerCompte');
  else if (!encryptSessionStorage.getItem('address') || !encryptSessionStorage.getItem('delivery') || !encryptSessionStorage.getItem('deliveryCost')) return navigateTo('/panier/commande/informations');
})

const encryptSessionStorage = useNuxtApp().$encryptSessionStorage;
const encryptLocalStorage = useNuxtApp().$encryptLocalStorage

const cartTotal = ref(0)
const longest = ref(0)
const widest = ref(0)
const totalHeight = ref(0)
const totalWeight = ref(0)
const deliveryTotal = ref(0)
const deliveryOverprice = ref(0)
const deliveryPrice = ref(0)
const estimatedTime = ref('')
const total = ref(0)
const isOpen = ref(false)
const stripe = ref()
const stripePaymentElement = ref()
const stripeElements = ref()
let isProcessing = ref(false)
  
onMounted(async () => {
  isProcessing.value = true
  stripe.value = await loadStripe(useRuntimeConfig().public.stripePk)
  const cart = encryptLocalStorage.getItem('cart')
  const address = encryptSessionStorage.getItem('address')
  const deliveryCost = encryptSessionStorage.getItem('deliveryCost')
  const chosenDelivery = encryptSessionStorage.getItem('delivery')
  deliveryOverprice.value = deliveryCost.find(d => d.delivery_type === chosenDelivery).price
  cart.forEach(item => {
    console.log(item)
    if (item.length > longest.value) longest.value = item.length
    if (item.width > widest.value) widest.value = item.width
    totalHeight.value = totalHeight.value + item.height
    totalWeight.value = totalWeight.value + item.weight
    cartTotal.value = Math.round(((item.price * item.quantity) + cartTotal.value) * 100) / 100
  })
  try {
    const data = {
      "from": "France",
      "to": `${address.country}`,
      "package": [
        {
          "content": "PC Hardware",
          "weight": totalWeight.value,
          "width": widest.value / 10,
          "height": totalHeight.value / 10,
          "length": longest.value / 10
        }
      ],
      "currency": "EUR"
    }
    encryptSessionStorage.setItem('deliveryData', data)
    const response = await ky.post('https://epicareer.epidoc.eu/api/package/estimate', {
      json: data,
    }).json()
    deliveryPrice.value = response.data.price.total
    estimatedTime.value = parseInt(response.data.travelTime)
    total.value = Math.round(((cartTotal.value + deliveryTotal.value + deliveryOverprice.value + deliveryPrice.value) * 100) / 100)
    encryptSessionStorage.setItem('commandTotal', total.value)
  } catch (error) {
    console.log(error)
  }
  
})

const openModal = async () => {
  isOpen.value = true
  const responsePaymentIntent = await ky.post("https://api.stripe.com/v1/payment_intents", {
    body: new URLSearchParams({
      "amount": total.value * 100,
      "currency": 'eur' 
    }),
    headers: {
      'Content-type': 'application/x-www-form-urlencoded',
      'Authorization': `Bearer ${useRuntimeConfig().public.stripeSk}`
    }
  }).json()
  const elements = stripe.value.elements({
    clientSecret: responsePaymentIntent.client_secret,
  });
  stripeElements.value = elements
  const paymentElement = elements.create('payment')
  stripePaymentElement.value = paymentElement
  paymentElement.mount('#card-element')
  paymentElement.on("change", function(event) {
    document.querySelector("button").disabled = event.empty;
    document.querySelector("#card-alert").textContent = event.error ? event.error.message : ""
  })
  isProcessing.value = false
}

const pay = async () => {
  const elements = stripeElements.value
  const {error} = await stripe.value.confirmPayment({
    elements,
    confirmParams: {
      return_url: 'https://localhost:3000/panier/commande/success'
    }
  })
  if (error) {
    document.querySelector("#card-alert").textContent = "Il y a eu un problème lors de votre paiement"
  }
}

</script>

<template>
  <div class="min-h-screen py-14 flex flex-col items-center bg-background-50 text-text-900" v-if="deliveryPrice">
    <div class="w-full max-w-lg mb-6">
      <h2 class="text-2xl font-semibold text-center text-dominant-500">Paiement</h2>
    </div>

    <div class="bg-transparent-10 rounded-lg shadow-lg p-5 w-full max-w-lg">
      <div class="space-y-4">
        
        
        <div class="flex flex-col text-lg mt-1">
          <div class="flex justify-between">
          <span>Total du panier</span>
          <span>{{cartTotal}} €</span>
            </div>
          <div class="flex justify-between">
          <span>Livraison</span>
          <span>
            {{deliveryTotal + deliveryOverprice + deliveryPrice}} €
          </span>
            </div>
        </div>

        <hr class="border-gray-300 my-4"/>

        <div class="flex justify-between text-accent-400 text-xl font-bold mb-4">
          <span>Total</span>
          <span>
            {{total}} €
          </span>
        </div>
        <div class="flex justify-between text-xl font-bold mb-4">
          <span>Temps estimé</span>
        <span>
            {{estimatedTime}} jour(s)
          </span>
          </div>

        <div class="flex flex-col space-y-2">
          <button class="text-white px-6 py-2 rounded-xl font-semibold bg-dominant-500" @click="openModal">
            Payer
          </button>
        </div>
        <UModal v-model="isOpen">
        <form @submit.prevent="pay()" class="p-5">
          <div id="card-element"/>
          <p id="card-alert" class="text-red-700 text-center font-semibold" role="alert"/>
          <button :disabled="isProcessing" type="submit" class="mt-4 bg-accent-500 text-text-50 rounded-xl px-4 py-1" :class="isProcessing ? 'opacity-70' : 'opacity-100'">
            <IsLoadingSVG v-if="isProcessing"/>
            <span v-else>Payer</span>
          </button>
        </form>
        </UModal>
      </div>
    </div>
  </div>
  <div v-else class="min-h-screen flex justify-center bg-white dark:bg-black items-center">
    <h1 class="text-4xl font-bold text-text-900">Récupération de vos informations de livraison...</h1>
  </div>
</template>

<style scoped>
</style>

