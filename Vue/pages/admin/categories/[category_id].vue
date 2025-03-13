<script setup lang="ts">
import { ref, reactive, watch } from 'vue';
import { useFetch } from '@vueuse/core';
import { useRoute } from 'vue-router';
import ky from 'ky';
const links = [{
  label: 'Catergories',
  icon: 'i-heroicons-home',
  to: '/admin/categories',
}]

const route = useRoute();
const categoryId = route.params.category_id;
const { data: category, isFinished } = useFetch(`/api/AdminCategory/${categoryId}`).json();

const state = reactive({
  type: "",
  name: "",
  image: "",
  form_specification_sheet: {}
});

const localFormSpecificationSheet = ref({});

watch([isFinished, category], () => {
  if (isFinished.value && category.value) {
    try {
      state.type = category.value.type;
      state.name = category.value.name;
      state.image = category.value.image;
      state.form_specification_sheet = JSON.parse(category.value.form_specification_sheet);
      localFormSpecificationSheet.value = JSON.parse(JSON.stringify(state.form_specification_sheet));
    } catch (error) {
      console.error('Erreur lors du parsing des données JSON:', error);
    }
  }
});

const updateKey = (event, oldKey) => {
  const newKey = event.target.value.trim();
  if (newKey && newKey !== oldKey) {
    localFormSpecificationSheet.value[newKey] = localFormSpecificationSheet.value[oldKey];
    delete localFormSpecificationSheet.value[oldKey];
  }
};

const updateNestedKey = (event, key, oldField) => {
  const newField = event.target.value.trim();
  if (newField && newField !== oldField) {
    localFormSpecificationSheet.value[key][newField] = localFormSpecificationSheet.value[key][oldField];
    delete localFormSpecificationSheet.value[key][oldField];
  }
};

const updateNestedNestedKey = (event, key, field, oldNestedField) => {
  const newNestedField = event.target.value.trim();
  if (newNestedField && newNestedField !== oldNestedField) {
    localFormSpecificationSheet.value[key][field][newNestedField] = localFormSpecificationSheet.value[key][field][oldNestedField];
    delete localFormSpecificationSheet.value[key][field][oldNestedField];
  }
};

const addNewSection = () => {
  localFormSpecificationSheet.value['Nouvelle Section'] = {};
};

const addNewField = (key) => {
  localFormSpecificationSheet.value[key]['Nouveau Champ'] = "";
};

const deleteSection = (key) => {
  delete localFormSpecificationSheet.value[key];
};

const deleteField = (key, field) => {
  delete localFormSpecificationSheet.value[key][field];
};

const handleSubmit = async () => {
  try {
    state.form_specification_sheet = JSON.parse(JSON.stringify(localFormSpecificationSheet.value));

    const formData = new FormData();
    formData.append('type', state.type);
    formData.append('name', state.name);
    formData.append('form_specification_sheet', JSON.stringify(state.form_specification_sheet));
    console.log(state.form_specification_sheet);
    const data = {
      type : state.type,
      name : state.name,
      form_specification_sheet : JSON.stringify(state.form_specification_sheet)
    }
    
    ky.put(`/api/AdminCategory/${categoryId}`, {
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify(data)
    }).then(res => console.log(res))

    alert('Catégorie mise à jour avec succès !');
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la catégorie:', error);
  }
};
</script>

<template>
  <UBreadcrumb :links="links" />
  <!-- component -->
  <div class="bg-gray-100">
   
    <div class="header my-3 h-12 px-10 flex items-center justify-between">
      <h1 class="font-medium text-2xl">Modifier la catégorie</h1>
    </div>
    <div class="flex flex-col mx-3 mt-6 lg:flex-row">
      <div class="w-full lg:w-1/3 m-1">
        <form class="w-full bg-white shadow-md p-6" @submit.prevent="handleSubmit">
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full md:w-full px-3 mb-6">
              <p class="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2">Nom</p>
              <UInput
                  v-model="state.name"
                  :placeholder="state.name"
                  type="text"
                  id="name"
                  class="mt-3 block w-full rounded-md placeholder-gray-400 sm:text-sm"
                  size="lg"
              />
            </div>
            <div class="w-full px-3 mb-6">
              <p class="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2">Type</p>
              <textarea textarea rows="4" class="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]" type="text" name="description" required > </textarea>
            </div>
            <p class="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2">Image actuelle</p>
            <img class="rounded-t-lg" :src="state.image" alt="" />
            <div class="w-full md:w-full px-3 mb-6">
              <button class="appearance-none block w-full bg-green-700 text-gray-100 font-bold border border-gray-200 rounded-lg py-3 px-3 leading-tight hover:bg-green-600 focus:outline-none focus:bg-white focus:border-gray-500"
              >Valider et mettre à jour</button>
            </div>
            <div class="w-full px-3 mb-8">
              <label class="mx-auto cursor-pointer flex w-full max-w-lg flex-col items-center justify-center rounded-xl border-2 border-dashed border-green-400 bg-white p-6 text-center" htmlFor="dropzone-file">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-green-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <h2 class="mt-4 text-xl font-medium text-gray-700 tracking-wide">Category image</h2>
                <p class="mt-2 text-gray-500 tracking-wide">Upload or drag & drop your file SVG, PNG, JPG or GIF. </p>
                <input id="dropzone-file" type="file" class="hidden" name="category_image" accept="image/png, image/jpeg, image/webp"/>
              </label>
            </div>
          </div>
        </form>
        
      </div>
      <div class="w-full lg:w-2/3 m-1 bg-white shadow-lg text-lg rounded-sm border border-gray-200">
        <div class="overflow-x-auto rounded-lg p-3">
          <table class="table-auto w-full">
            <thead class="text-sm font-semibold uppercase text-gray-800 bg-gray-50 mx-auto">
            <tr>
              <td>1</td>
              <td><img src="https://images.pexels.com/photos/25652584/pexels-photo-25652584/free-photo-of-elegant-man-wearing-navy-suit.jpeg?auto=compress&cs=tinysrgb&w=400" class="h-8 w-8 mx-auto" /></td>
              <td>Sample Name</td>
              <td>Sample Description</td>
              <td class="p-2">
                <div class="flex justify-center">
                  <button @click.prevent="addNewSection" class="rounded-md hover:bg-green-100 text-green-600 p-2 flex justify-between items-center">
                                        <span><FaEdit class="w-4 h-4 mr-1"/>
                                        </span> nouvelle section
                  </button>
                </div>
              </td>
            </tr>
            </thead>
          </table>
        </div>
        <div v-for="(obj, key) in localFormSpecificationSheet" :key="`section-${key}`" class="mt-4">
          <h2 class="text-lg font-bold">
            <UInput
                :placeholder="key"
                type="text"
                :id="`key-${key}`"
                class="mt-1 block w-full rounded-md placeholder-gray-400 sm:text-sm"
                size="lg"
                @blur="event => updateKey(event, key)"
            />
            <button @click.prevent="deleteSection(key)" class="ml-2 text-red-500">Supprimer</button>
          </h2>
        </div>





        <div v-for="(obj, key) in localFormSpecificationSheet" :key="`section-${key}`" class="mt-4">
          <h2 class="text-lg font-bold">
            <UInput
                :value="key"
                :placeholder="key"
                type="text"
                :id="`key-${key}`"
                class="mt-1 block w-full rounded-md placeholder-gray-400 sm:text-sm"
                size="lg"
                @blur="event => updateKey(event, key)"
            />
            <button @click.prevent="deleteSection(key)" class="ml-2 text-red-500">Supprimer</button>
          </h2>

          <button @click.prevent="addNewField(key)" class="mb-2 text-blue-500">Ajouter un champ</button>

          <div v-for="(nestedObject, fieldKey) in obj" :key="`field-${fieldKey}`" class="mt-2">
            <label>
              <UInput
                  :value="fieldKey"
                  :placeholder="fieldKey"
                  type="text"
                  :id="`fieldKey-${fieldKey}`"
                  class="mt-1 block w-full rounded-md placeholder-gray-400 sm:text-sm"
                  size="lg"
                  @blur="event => updateNestedKey(event, key, fieldKey)"
              />
              <button @click.prevent="deleteField(key, fieldKey)" class="ml-2 text-red-500">Supprimer</button>
            </label>

            <div v-if="typeof nestedObject === 'object' && nestedObject !== null" v-for="(value, nestedFieldKey) in nestedObject" :key="`nestedField-${nestedFieldKey}`">
              <label>
                <UInput
                    :value="nestedFieldKey"
                    :placeholder="nestedFieldKey"
                    type="text"
                    :id="`nestedFieldKey-${nestedFieldKey}`"
                    class="mt-1 block w-full rounded-md placeholder-gray-400 sm:text-sm"
                    size="lg"
                    @blur="event => updateNestedNestedKey(event, key, fieldKey, nestedFieldKey)"
                />
              </label>
            </div>
          </div>
        </div>

        <button @click.prevent="addNewSection" class="mt-5 bg-green-500 hover:bg-green-600 text-white p-2 rounded">Ajouter une section</button>
        
      </div>
      
    </div>
  </div>
  
  
  <div class="pt-24">
    
    
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="type">Type:</label>
        <UInput
            v-model="state.type"
            :placeholder="state.type"
            type="text"
            id="type"
            class="mt-3 block w-full rounded-md placeholder-gray-400 sm:text-sm"
            size="lg"
        />
      </div>
      <div>
        <label for="name">Name:</label>
        <UInput
            v-model="state.name"
            :placeholder="state.name"
            type="text"
            id="name"
            class="mt-3 block w-full rounded-md placeholder-gray-400 sm:text-sm"
            size="lg"
        />
      </div>

      <div v-for="(obj, key) in localFormSpecificationSheet" :key="`section-${key}`" class="mt-4">
        <h2 class="text-lg font-bold">
          <UInput
              :value="key"
              :placeholder="key"
              type="text"
              :id="`key-${key}`"
              class="mt-1 block w-full rounded-md placeholder-gray-400 sm:text-sm"
              size="lg"
              @blur="event => updateKey(event, key)"
          />
          <button @click.prevent="deleteSection(key)" class="ml-2 text-red-500">Supprimer</button>
        </h2>

        <button @click.prevent="addNewField(key)" class="mb-2 text-blue-500">Ajouter un champ</button>

        <div v-for="(nestedObject, fieldKey) in obj" :key="`field-${fieldKey}`" class="mt-2">
          <label>
            <UInput
                :value="fieldKey"
                :placeholder="fieldKey"
                type="text"
                :id="`fieldKey-${fieldKey}`"
                class="mt-1 block w-full rounded-md placeholder-gray-400 sm:text-sm"
                size="lg"
                @blur="event => updateNestedKey(event, key, fieldKey)"
            />
            <button @click.prevent="deleteField(key, fieldKey)" class="ml-2 text-red-500">Supprimer</button>
          </label>

          <div v-if="typeof nestedObject === 'object' && nestedObject !== null" v-for="(value, nestedFieldKey) in nestedObject" :key="`nestedField-${nestedFieldKey}`">
            <label>
              <UInput
                  :value="nestedFieldKey"
                  :placeholder="nestedFieldKey"
                  type="text"
                  :id="`nestedFieldKey-${nestedFieldKey}`"
                  class="mt-1 block w-full rounded-md placeholder-gray-400 sm:text-sm"
                  size="lg"
                  @blur="event => updateNestedNestedKey(event, key, fieldKey, nestedFieldKey)"
              />
            </label>
          </div>
        </div>
      </div>

      <button @click.prevent="addNewSection" class="mt-5 bg-green-500 hover:bg-green-600 text-white p-2 rounded">Ajouter une section</button>
      <button type="submit" class="mt-5 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded">Mettre à jour</button>
    </form>
  </div>
</template>
