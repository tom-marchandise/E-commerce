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
  <Card class="flex flex-col h-[calc(100vh_-_7rem)] bg-transparent-10 rounded-xl p-5">
    <template #header>
      <div class="flex items-center py-2">
        <h2 class="font-bold text-2xl text-dominant-500 min-w-fit">Liste des utilisateurs</h2>
      </div>
    </template>

    <template #content>
      <ul class="flex flex-col gap-3 overflow-y-scroll rounded-xl scrollbar-hide">
        <li v-for="user in users" :key="user.id" class="p-4 flex items-center gap-3 bg-transparent-10 hover:bg-secondary-200 rounded-xl cursor-pointer relative">
          <span class="text-lg text-text-900 font-semibold">{{ user.first_name }} {{ user.last_name }}</span>
          <span class="text-md text-gray-500">{{ user.role }}</span>
          <div class="absolute right-4 bottom-3 gap-2 flex items-center">
            <UsersModal :user="user" />
          </div>
        </li>
      </ul>
    </template>

    <template #footer>
      <div class="flex justify-between text-ms items-center px-1">
        <span class="text-gray-500 text-md">23 utilisateurs</span>
        <UButton  @click="downloadCsv" class="mt-1 block border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-4 max-h-[50rem] ">Télécharger fiche utilisateur</UButton>
      </div>
    </template>
  </Card>
</template>

<style scoped>
</style>
