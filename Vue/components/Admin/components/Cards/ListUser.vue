<script setup lang="ts">
import Card from "~/components/Admin/components/Cards/Card.vue";
import { useFetch } from "@vueuse/core";
import {onMounted, ref} from "vue";
import UsersModal from "~/components/Admin/components/Users/UsersModal.vue";
import jwtDecode from "jwt-decode";
import ky from "ky";

const { data: users, isFinished } = useFetch("/api/AdminUser").json();

console.log(users)




async function downloadCsv() {
  try {
    const response = await ky.post('/api/DownloadCsv/GetUsers');
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'users.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); 
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('erreur dans le telechargement du csv :', error);
  }
}



</script>

<template>
  <Card class="bg-transparent-10 text-text-900">
    <template #header>
      <h1 class="font-bold text-xl text-dominant-500">Utilisateurs</h1>
    </template>

    <template #content>
      <ul class="flex flex-col">
        <li v-for="user in users" :key="user.id" class="flex flex-col lg:hover:bg-gray-600 w-full px-5 py-3 duration-100 relative border-b-4 border-gray-500">
          <span class="text-lg font-semibold">{{ user.first_name }} {{ user.last_name }}</span>
          <span class="text-md text-gray-500">{{ user.role }}</span>
          <div class="absolute right-4 bottom-3 gap-2 flex items-center">
            <UsersModal :user="user" />
          </div>
        </li>
      </ul>
    </template>

    <template #footer>
      <div class="flex justify-between text-ms items-center px-1">
        <span class="text-gray-500 text-md">325 utilisateurs</span>
        <UButton  @click="downloadCsv" class="mt-1 block border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-4 max-h-[50rem] ">télécharger fiche utilisateur</UButton>
      </div>
    </template>
  </Card>
</template>

<style scoped>
</style>
