<script setup lang="ts">
import { object, string, number, type InferType } from 'yup'
import {FormSubmitEvent} from "@nuxt/ui/dist/runtime/types";
import ky from "ky";
import jwtDecode from "jwt-decode";
import {useToast} from "vue-toastification";

const props = defineProps({
  token: String || null
})

const isRemembered = ref(false)
const encryptSessionStorage = useNuxtApp().$encryptSessionStorage;
const emit = defineEmits(["handleConfirmAddress"])
const schema = object({
  civility: string().required('Ce champ est obligatoire'),
  name: string().required('Ce champ est obligatoire'),
  firstname: string().required('Ce champ est obligatoire'),
  street: string().required('Ce champ est obligatoire'),
  city: string().required('Ce champ est obligatoire'),
  zipcode: number().required('Ce champ est obligatoire'),
  country: string().required('Ce champ est obligatoire'),
  phone_number: number().required('Ce champ est obligatoire')
})

type Schema = InferType<typeof schema>

const countries = ['France', 'Luxembourg', 'Belgique', 'Monaco']

const state = reactive({
  civility: 'Mr.',
  name: undefined,
  firstname: undefined,
  street: undefined,
  city: undefined,
  zipcode: undefined,
  country: countries[0],
  phone_number: undefined,
  user_id: null
})

const civilities = [
  {
    value: 'Mr.',
    label: 'Mr.'
  },
  {
    value: 'Mme.',
    label: 'Mme.'
  }
]

async function onSubmit (event: FormSubmitEvent<Schema>) {
  if (isRemembered.value) {
    try {
      const userInfos = jwtDecode(props.token)
      event.data.user_id = userInfos.id
      await ky.post('/api/Adresses', {
        json: event.data
      })
    } catch (error) {
      console.log(error)
    }
  }
  encryptSessionStorage.setItem('address', event.data)
  emit("handleConfirmAddress", event.data)
}
</script>

<template>
  <div class="p-6 text-text-900">
  <h1 class="text-2xl flex justify-center">Adresse de livraison</h1>
    <p class="text-sm flex justify-center">Tous les champs sont obligatoires</p>
<UForm class="flex flex-col gap-5 mt-3" :schema="schema" :state="state" @submit="onSubmit">
  <UFormGroup label="Civilité" name="civility">
    <URadioGroup v-model="state.civility" :options="civilities"/>
  </UFormGroup>
  <div class="flex gap-2">
  <UFormGroup label="Nom" name="name">
    <UInput v-model="state.name"/>
  </UFormGroup>
  <UFormGroup label="Prénom" name="firstname">
    <UInput v-model="state.firstname"/>
  </UFormGroup>
  </div>
  <UFormGroup label="Adresse" name="street">
    <UInput v-model="state.street"/>
  </UFormGroup>
  <div class="flex gap-2">
  <UFormGroup label="Code postal" name="zipcode">
    <UInput v-model="state.zipcode"/>
  </UFormGroup>
  <UFormGroup label="Ville" name="city">
    <UInput v-model="state.city"/>
  </UFormGroup>
  </div>
  <UFormGroup label="Pays" name="country">
    <USelect :options="countries" v-model="state.country"/>
  </UFormGroup>
  <UFormGroup label="Numéro de téléphone" name="phone_number">
    <UInput v-model="state.phone_number"/>
  </UFormGroup>
  <UCheckbox v-if="token !== null" label="Enregistrer cette adresse" v-model="isRemembered" name="remember"/>
  <span v-else class="text-sm">Connectez-vous afin d'enregistrer une adresse</span>
  <UButton type="submit" class="w-fit" size="lg">Confirmer</UButton>
</UForm>
  </div>
</template>

<style scoped>

</style>