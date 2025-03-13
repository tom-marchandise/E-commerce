<script setup lang="ts">
import {onMounted, ref} from "vue";
import ky from "ky";
import jwtDecode from "jwt-decode";

const isVisible = ref(false);
const isOpen = ref(false);
const selectedRole = ref('');
const roles = ['Admin', 'Customers', 'Super-Admin'];
const isSuperAdmin = ref(true);

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});

onMounted(() => {
  const token = localStorage.getItem('jwt');
  console.log('jwt:', token);
  if (token) {
    const decodedToken: any = jwtDecode(token);
    console.log(decodedToken);
    if (decodedToken.role === 'super-admin'){
      console.log("super admin")
      console.log(isSuperAdmin.value);
      isSuperAdmin.value = false
    }else {
      console.log("TU N'EST PAS super admin")
      console.log(isSuperAdmin.value);
      isSuperAdmin.value = true
    }
  }
})

const handleSubmit = async () => 
{
  console.log(role.value.toLowerCase());
  console.log(selectedRole.value.toLowerCase());
  console.log(props.user.id);
  const id = props.user.id;

  const data = {
    role: role.value.toLowerCase(),
  };

  const response = await ky.put(`/api/AdminUser/ChangeRole/${id}`, {
    json: data
  });

  if (response.ok) {
    console.log(`le role de ${props.user.id} à bien été modifié`);
  } else {
    console.error('Erreur lors de la modification du role');
  }
}





</script>
<template>
  <div>
    <UButton @click="isOpen = true" class="" :disabled="isSuperAdmin">Modifier le rôle</UButton>
    <UModal v-model="isOpen" :overlay="false">
      <div class="p-4 max-h-[50rem] overflow-y-scroll">
            <form @submit.prevent="handleSubmit()">
              <select v-model="selectedRole" id="role" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <option v-for="role in roles" :key="role" :value="role">{{ role }}</option>
              </select>
                <UButton type="submit">Confirmer</UButton>
            </form>
      </div>
    </UModal>
    </div>
</template>

<style scoped>
</style>
