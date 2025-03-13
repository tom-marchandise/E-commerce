<script setup lang="ts">
  const props = defineProps({
    isOptionUserOpen : {
      type : Boolean
    },
    firstName : {
      type : String
    }
  })
  
  const emit = defineEmits(["disconnectUser"])
  const handleDisconnectUser = async () => {
    emit("disconnectUser");
  }
  
</script>

<template>
<div class=" w-max bg-white absolute border left-[-5rem] top-7 rounded p-3" v-if="isOptionUserOpen">
  <ul class="flex flex-col gap-3 w-full">
    <li class="w-full p-2 cursor-pointer">
      <NuxtLink to="/profil" class="text-lg text-gray-900">Profil</NuxtLink>
    </li>

    <li class="w-full">
      <span class="text-red-500  w-full cursor-pointer" @click="handleDisconnectUser">Se déconnecter</span>
    </li>
  </ul>
</div>
</template>