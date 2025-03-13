<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

import { CheckBadgeIcon } from '@heroicons/vue/24/outline'

const route = useRoute()
const router = useRouter()

const otp = ref('')
const errorMessage = ref('')
const userId = ref<number | null>(null)

const handleVerifyOtp = async () => {
  errorMessage.value = ''
  try {
    if (!userId.value || !otp.value) {
      errorMessage.value = 'L\'ID utilisateur ou le code OTP est manquant.'
      return
    }
    const response = await axios.post('/api/Auth/verify-otp', {
      userId: userId.value,
      otp: otp.value
    })

    if (response.status === 200) {
      localStorage.setItem('jwt', response.data.token)
      router.push('/auth/registersuccess')
    }
  } catch (error) {
    errorMessage.value = 'Une erreur est survenue lors de la vérification du code OTP. Veuillez réessayer.'
  }
}

// récupération de l'ID utilisateur depuis l'URL
onMounted(() => {
  const query = route.query
  if (query.userId) {
    userId.value = Number(query.userId)
  }
})
</script>

<template>
  <div class="flex flex-col justify-center items-center h-screen space-y-4 bg-[#F3F2F2] dark:bg-black text-text-900">
    <div class="flex items-center space-x-2">
      <CheckBadgeIcon class="w-10 h-10 text-dominant-500" />
      <h1 class="text-2xl font-bold">Vérification</h1>
    </div>
    <p class="text-2xl font-bold text-center">
      Veuillez entrer le code à 6 chiffres envoyé à votre email pour valider votre inscription.
    </p>
    <div class="w-80">
      <input
          type="text"
          v-model="otp"
          placeholder="Entrez le code"
          class="w-full px-4 py-2 mt-2 border border-[#D2D2D2] rounded-lg bg-transparent text-black focus:outline-none focus:ring-2"
          required
      />
      <p v-if="errorMessage" class="text-red-500 mt-2">{{ errorMessage }}</p>
      <button
          @click="handleVerifyOtp"
          class="w-full bg-dominant-500 text-white py-2 px-4 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 mt-4"
      >
        Vérifier le code
      </button>
    </div>
  </div>
</template>

<style scoped>
</style>
