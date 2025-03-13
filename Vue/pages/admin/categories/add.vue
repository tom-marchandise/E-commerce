<script setup lang="ts">
import { ref } from "vue";
import { useFetch } from "@vueuse/core";
import NoImage from "../../../assets/pictures/Categories/NoImage.jpg";
import SpecificationComponent from "~/components/Admin/components/SpecificationField/SpecificationField.vue";
import ky from "ky";
const links = [{
  label: 'Catergories',
  icon: 'i-heroicons-home',
  to: '/admin/categories',
}]

const { data: categories } = useFetch("/api/AdminCategory").json();

const state = ref({
  name: "",
  form_specification_sheet: null,
  parent_category: null,
  filters: null,
  image: null as File | null,
});

const isSubCategory = ref<boolean>(false);
const specifications = ref<{ id: number; value: string; subField: any[] }[]>([]);
const inputFileRef = ref<HTMLInputElement | null>(null);
const imageUrl = ref<string | null>(null);

const triggerFileInput = () => {
  inputFileRef.value?.click();
};

const handleFileChange = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    state.value.image = file;
    const reader = new FileReader();
    reader.onload = () => {
      imageUrl.value = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
};

const addSpecificationField = () => {
  const newId = Date.now();
  specifications.value.push({ id: newId, value: "", subField : []});
  console.log(specifications.value)
};

const addSubSpecificationField = (id : number) => {
  const newId = Date.now();
  const currentInput = specifications.value.find(item => item.id === id);
  if(!currentInput) return;
  currentInput.subField.push({ id: newId, value: "", subField : []})
  
  console.log(currentInput)
}

const removeSpecificationField = (id: number) => {
  specifications.value = specifications.value.filter((spec) => spec.id !== id);
};

const updateSpecification = (id: number, updatedSpec: any) => {
  const spec = specifications.value.find(spec => spec.id === id);
  if (spec) {
    Object.assign(spec, updatedSpec);
  }
};

const handleSubmitCategory = async () => {
  try {
    const formData = new FormData();
    formData.append("name", state.value.name);
    formData.append("form_specification_sheet", JSON.stringify(specifications.value))
    if (state.value.image instanceof File) {
      formData.append("image", state.value.image, state.value.image.name);
    } else {
      console.error("L'image doit être un fichier de type File.");
    }
    
    await ky.post("/api/AdminCategory", {
      body : formData
    });
  } catch (e) {
    console.log(e)
  }

  
};


</script>

<template>
  <UBreadcrumb :links="links" />
  <form @submit.prevent="handleSubmitCategory" class="p-5 min-h-screen flex flex-col gap-4">
    <input type="text" v-model="state.name" class="text-xl w-fit border p-3 rounded-md w-full" placeholder="Titre de la catégorie"/>
    <input type="file" name="image_category" id="image_category" class="h-0 w-0 hidden" ref="inputFileRef"  @change="handleFileChange">
    <UCheckbox v-model="isSubCategory" name="notifications" label="Categorie parent " />
    <USelect v-model="state.parent_category" :options="categories" option-attribute="name" value-attribute="id" v-if="isSubCategory && categories" placeholder="Catégories" size="xl"/>
    <button type="button" class="bg-blue-600 text-lg text-white w-full border py-2 rounded-md lg:hover:cursor-pointer" @click="triggerFileInput" >Ajouter une image</button>
    <img :src="imageUrl || NoImage" alt="Image sélectionnée" class="w-96 h-auto object-cover rounded-md shadow-md">

    <h2 class="text-2xl font-medium mt-3">Spécifications</h2>
    <div v-for="(spec, index) in specifications" :key="spec.id">
      <SpecificationComponent
          v-model="state.form_specification_sheet"
          :spec="spec"
          @update="updateSpecification"
          @remove="removeSpecificationField"
      />
    </div>
    <button type="button" @click="addSpecificationField" class="bg-orange-500 p-2 text-sm rounded-md text-white hover:bg-orange-600">
      Ajouter un champ
    </button>
    <button type="submit" class="bg-green-500 p-2 text-sm rounded-md text-white hover:bg-green-600">
      Créer la catégorie
    </button>
    
    
    <h2>Filtre</h2>
  </form>
</template>
