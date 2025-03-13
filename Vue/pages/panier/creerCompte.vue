<script setup lang="ts">
import {navigateTo} from "nuxt/app";
import Login from "~/components/Auth/Login.vue";
import Register from "~/components/Auth/Register.vue";
import {onBeforeMount} from "vue";


const withoutAccount = ref(false)
const inputEmail = ref('')
const isOpen = ref(false)
const whichComponent = ref('login')
const emailError = ref('')

const encryptSessionStorage = useNuxtApp().$encryptSessionStorage;
const encryptLocalStorage = useNuxtApp().$encryptLocalStorage

onBeforeMount(() => {
  if (!encryptLocalStorage.getItem('cart') || encryptLocalStorage.getItem('cart').length === 0) return navigateTo('/')
  else if (localStorage.getItem('jwt')) return navigateTo('/panier/commande/livraison')
})

const validateEmail = () => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  emailError.value = emailPattern.test(inputEmail.value) ? '' : 'Adresse e-mail invalide';
  if (emailError.value === '') {
    isOpen.value = true
  }
}
const confirmMail = () => {
  isOpen.value = false
  encryptSessionStorage.setItem('email', inputEmail.value)
  navigateTo('/panier/commande/informations')
}
</script>

<template>
<div class="min-h-screen bg-[#F3F2F2] dark:bg-black text-text-900">
  <div class="flex flex-col items-center pt-12">
    <div class="flex gap-5">
      <h2 @click="whichComponent = 'login'" :class="whichComponent === 'login' ? 'font-bold text-dominant-500 underline' : 'font-medium'" class="text-xl cursor-pointer">Se connecter</h2>
      <h2 @click="whichComponent = 'register'" :class="whichComponent === 'register' ? 'font-bold text-dominant-500 underline' : 'font-medium'" class="text-xl font-bold cursor-pointer">S'inscrire</h2>
      <h2 @click="whichComponent = 'withoutAccount'" :class="whichComponent === 'withoutAccount' ? 'font-bold text-dominant-500 underline' : 'font-medium'" class="text-xl font-bold cursor-pointer">Continuer sans compte</h2>
    </div>
    <div class="pt-20">
    <Login v-if="whichComponent === 'login'"/>
    <Register v-else-if="whichComponent === 'register'"/>
<!--    <button class="bg-[#171717] text-white py-1 px-2 mt-16 text-lg rounded-lg" @click="withoutAccount = !withoutAccount">Continuer sans compte</button>-->
    <div class="flex flex-col bg-transparent-10 border border-dominant-200 rounded-xl p-10 shadow" v-else-if="whichComponent === 'withoutAccount'">
      <h2 class="font-medium text-lg mb-3">Rentrez votre adresse e-mail ci-dessous :</h2>
      <input type="email" class="outline-0 border-[#D2D2D2] border rounded-lg p-2 focus:outline-none focus:ring-2" placeholder="E-mail" v-model="inputEmail">
      <span v-if="emailError !== ''" class="text-red-500 text-md mt-1">{{emailError}}</span>
      <div class="flex justify-end">
      <button class="flex bg-dominant-500 w-fit text-white px-2 py-1 rounded-lg mt-1" @click="validateEmail">Confirmer</button>
      </div>
    </div>
  </div>
  <UModal v-model="isOpen">
    <div class="flex flex-col p-8">
      <span class="font-bold text-2xl">Votre adresse e-mail est :</span>
      <span class="text-xl">"{{inputEmail}}"</span>
      <div class="flex justify-around mt-5">
      <button @click="isOpen = false" class="bg-red-400 text-white p-1 rounded-lg">Corriger</button>
      <button @click="confirmMail" class="bg-emerald-400 p-1 rounded-lg text-white">Confirmer</button>
      </div>
    </div>
  </UModal>
    </div>
</div>
</template>

<style scoped>

</style>