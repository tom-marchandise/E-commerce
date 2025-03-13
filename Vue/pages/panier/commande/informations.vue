<script setup lang="ts">
import jwtDecode from "jwt-decode";
import {onBeforeMount, onMounted, ref} from "vue";
import {useFetch} from "@vueuse/core";
import AddressForm from "~/components/commandes/AddressForm.vue";
import {navigateTo} from "nuxt/app";
import ky from "ky";
import { CheckBadgeIcon } from '@heroicons/vue/24/outline';



onBeforeMount(() => {
  if (!encryptLocalStorage.getItem('cart') || encryptLocalStorage.getItem('cart').length === 0) return navigateTo('/');
  else if (!localStorage.getItem('jwt') && !encryptSessionStorage.getItem('email')) return navigateTo('/panier/creerCompte');
})

const token = ref(null)
const address = ref(null)
const addressList = ref(null)
const isOpen = ref(false)
const chooseDelivery = ref('Standard')
const multipleAddressIsOpen = ref(false)
const deliveryCost = ref([])
const delivery = ref([])
const encryptSessionStorage = useNuxtApp().$encryptSessionStorage;
const encryptLocalStorage = useNuxtApp().$encryptLocalStorage

onMounted(async () => {
  token.value = localStorage.getItem('jwt')
  if (token.value) {
    const userInfos = jwtDecode(token.value)
    console.log(userInfos)
    const{ data: addresses, isFetching, isFinished } = await useFetch(`/api/Adresses/User/${userInfos.id}`).json()
    console.log(addresses)
    if (addresses.value.length === 0) return
    addressList.value = addresses.value
    address.value = addresses.value[0]
    deliveryCost.value = await ky.get(`/api/ShippingCost/Country/${addresses.value[0].country}`).json()
    delivery.value = [
      {
        value: 'Standard',
        label: 'Livraison standard : + ' + deliveryCost.value.find(d => d.delivery_type === 'Standard').price + '€'
      },
      {
        value: 'Express',
        label: `Livraison express : + ${deliveryCost.value.find(d => d.delivery_type === 'Express').price}€`
      }
    ]
    encryptSessionStorage.setItem('address', address.value)
  }
})

const handleConfirmAddress = async (addressInfos) => {
  isOpen.value = false
  deliveryCost.value = await ky.get(`/api/ShippingCost/Country/${addressInfos.country}`).json()
  address.value = addressInfos
  delivery.value = [
    {
      value: 'Standard',
      label: 'Livraison standard : + ' + deliveryCost.value.find(d => d.delivery_type === 'Standard').price + '€'
    },
    {
      value: 'Express',
      label: `Livraison express : + ${deliveryCost.value.find(d => d.delivery_type === 'Express').price}€`
    }
  ]
}

const chooseAddress = async (addressInfos) => {
  deliveryCost.value = await ky.get(`/api/ShippingCost/Country/${addressInfos.country}`).json()
  address.value = addressInfos
  encryptSessionStorage.setItem('address', addressInfos)
  multipleAddressIsOpen.value = false
  delivery.value = [
    {
      value: 'Standard',
      label: 'Livraison standard : + ' + deliveryCost.value.find(d => d.delivery_type === 'Standard').price + '€'
    },
    {
      value: 'Express',
      label: `Livraison express : + ${deliveryCost.value.find(d => d.delivery_type === 'Express').price}€`
    }
  ]
}

const confirmDeliveryInfos = () => {
  encryptSessionStorage.setItem('delivery', chooseDelivery.value)
  encryptSessionStorage.setItem('deliveryCost', deliveryCost.value)
  console.log(chooseDelivery.value, deliveryCost.value)
  navigateTo('/panier/commande/livraison')
}

</script>

<template>
<div class="min-h-screen flex flex-col items-center dark:bg-black text-text-900 pt-16">
  <h1 class="text-3xl font-bold">Mode de livraison</h1>
  <div class="flex gap-10 w-full justify-center pt-16">
    <div class="bg-transparent-10 w-1/4 rounded-xl shadow h-fit p-6 border border-dominant-200">
      <h2 class="text-2xl text-dominant-500 flex justify-center">À domicile</h2>
      <h3 class="text-xl mt-5">Votre adresse :</h3>
      <div v-if="address === null" class="mt-2">
        <p class="my-2 bg-transparent-10 p-3 rounded-lg">Pas d'adresse enregistrée</p>
        <button class="bg-dominant-500 text-text-50 px-2 py-1 rounded-lg" @click="isOpen = true">Renseigner une adresse</button>
      </div>
      <div v-else class="bg-transparent-10 p-3 rounded-lg border border-gray-300 mt-5">
        <p v-for="(addressInfo, key) in address" class="text-text-900">{{key !== 'user_id' ? addressInfo : ''}}</p>
        <button class="bg-dominant-500 text-white px-2 py-1 rounded-lg border border-gray-300 mt-5 hover:bg-dominant-400 mr-2" @click="isOpen = true">Changer</button>
        <button
            v-if="addressList && addressList.length > 1"
            class="bg-white border border-gray-300 text-black py-1 px-2 rounded-lg ml-3 hover:bg-gray-100 mr-2"
            @click="multipleAddressIsOpen = true">
          Autre adresse
        </button>
        <UModal v-model="multipleAddressIsOpen">
          <div class="p-10 flex-wrap flex justify-center gap-5">
            <div v-for="eachAddress in addressList" class="bg-transparent-10 w-48 p-3 text-black rounded-lg">
              <p v-for="addressInfo in eachAddress">{{addressInfo}}</p>
              <button
                  @click="chooseAddress(eachAddress)"
                  class="bg-white border border-gray-300 text-black py-1 px-2 rounded-lg w-full flex items-center justify-center">
                Choisir
              </button>
            </div>
          </div>
        </UModal>
      </div>

      <div v-if="address && deliveryCost" class="">
        <URadioGroup :options="delivery" class="text-lg" color="dominant" legend="Choisissez votre livraison" v-model="chooseDelivery"/>
        <button
            class="bg-dominant-500 text-white py-1 px-2 rounded-lg mt-3 flex items-center justify-center w-full hover:bg-dominant-400 mr-2"
            @click="confirmDeliveryInfos">
          <CheckBadgeIcon class="h-5 w-5 text-accent-500 mr-2" aria-hidden="true" />
          <span>Confirmer</span>
        </button>
      </div>
    </div>
    </div>
  <UModal v-model="isOpen">
    <AddressForm :token="token" @handleConfirmAddress="handleConfirmAddress"/>
  </UModal>
</div>
</template>

<style scoped>

</style>